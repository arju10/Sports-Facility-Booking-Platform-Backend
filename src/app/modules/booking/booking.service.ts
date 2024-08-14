import { Booking } from './booking.model';
import { Facility } from '../facilities/facilities.model';
import { Types } from 'mongoose';
import { TBookings } from './booking.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { BookingSearchbleFields } from './booking.constant';
import { FacilitySearchbleFields } from '../facilities/facilities.constant';


// Check available slots
const checkAllAvailableBookingsSlot = async (query: Record<string, unknown>) => {
  const facilityQuery = new QueryBuilder(Facility.find(), query)
    .search(FacilitySearchbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facilityQuery.modelQuery;

  const meta = await facilityQuery.countTotal();

  return {
    meta,
    result,
  };
};



// Check if a time slot is within the facility's available time and day
const isTimeSlotAvailable = async (
  facilityId: Types.ObjectId,
  // date: string,
  startTime: string,
  endTime: string
): Promise<boolean> => {
  const facility = await Facility.findById(facilityId);
  if (!facility) {
    throw new Error('Facility not found');
  }


  // Check if the start and end times are within the facility's available hours
  if (startTime < facility.startTime || endTime > facility.endTime) {
    return false;
  }

  return true;
};

// Create new Booking
const createBookingIntoDB = async (payload: TBookings) => {
  // Check if the booking time slot is available for the facility
  const isAvailable = await isTimeSlotAvailable(
    payload.facility as Types.ObjectId,
    payload.startTime,
    payload.endTime
  );

  if (!isAvailable) {
    throw new Error('The selected time slot is not available for the facility.');
  }

  // Create the booking
  const result = (await (await Booking.create(payload)).populate('facility')).populate('user');
  
  return result;
};


// Get All Booking Data with pagination ==== API: ("/api/bookings//?page=1&limit=10") === Method :[ GET]
const getAllBookingDataFromDB = async (query: Record<string, unknown>) => {
  const bookingDataQuery = new QueryBuilder(Booking.find(), query)
    .search(BookingSearchbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookingDataQuery.modelQuery;

  const meta = await bookingDataQuery.countTotal();

  return {
    meta,
    result,
  };
};

// Get Bookings by User ID
const getBookingsByUserIdFromDB = async (userId: Types.ObjectId) => {
  const result = await Booking.find({ user: userId })
  .populate('facility')
  .populate('user'); // Adjust fields as necessary
  // console.log(`Fetching bookings for user ID: ${userId}`); // Log the user ID
  return result;
};

// Cancel Booking by ID
const cancelBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(id, { isBooked: 'canceled' }, { new: true });
  return result;
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingDataFromDB,
  getBookingsByUserIdFromDB,
  cancelBookingFromDB,
  checkAllAvailableBookingsSlot
};
