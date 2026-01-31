import httpStatus from "http-status";
import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { Booking } from "./booking.model";
import { Facility } from "../facility/facility.model";
import { IBooking, ITimeSlot, IAvailableSlots } from "./booking.interface";
import QueryBuilder from "../../utils/QueryBuilder";

const bookingSearchableFields = ["date", "isBooked"];

// Helper function to convert time string to minutes
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Helper function to convert minutes to time string
const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
};

// Check if booking overlaps with existing bookings
const hasOverlap = (
  startTime: string,
  endTime: string,
  existingBookings: IBooking[],
): boolean => {
  const newStart = timeToMinutes(startTime);
  const newEnd = timeToMinutes(endTime);

  for (const booking of existingBookings) {
    if (booking.isBooked === "canceled") continue;

    const existingStart = timeToMinutes(booking.startTime);
    const existingEnd = timeToMinutes(booking.endTime);

    // Check for overlap
    if (newStart < existingEnd && newEnd > existingStart) {
      return true;
    }
  }

  return false;
};

// Check available time slots for a facility on a specific date
const checkAvailability = async (
  date: string,
  facilityId?: string,
): Promise<IAvailableSlots[]> => {
  // Get facilities (either specific one or all)
  const facilities = facilityId
    ? [await Facility.findById(facilityId)]
    : await Facility.find();

  if (!facilities.length || facilities[0] === null) {
    throw new AppError(httpStatus.NOT_FOUND, "No facilities found");
  }

  const result: IAvailableSlots[] = [];

  for (const facility of facilities) {
    if (!facility) continue;

    // Get all bookings for this facility on the specified date
    const bookings = await Booking.find({
      facility: facility._id,
      date,
      isBooked: { $ne: "canceled" },
    }).sort({ startTime: 1 });

    // Default facility hours (assuming 24-hour operation)
    const facilityStartTime = 0; // 00:00
    const facilityEndTime = 24 * 60; // 24:00

    const availableSlots: ITimeSlot[] = [];
    let currentTime = facilityStartTime;

    // Find gaps between bookings
    for (const booking of bookings) {
      const bookingStart = timeToMinutes(booking.startTime);
      const bookingEnd = timeToMinutes(booking.endTime);

      if (currentTime < bookingStart) {
        availableSlots.push({
          startTime: minutesToTime(currentTime),
          endTime: minutesToTime(bookingStart),
        });
      }

      currentTime = Math.max(currentTime, bookingEnd);
    }

    // Add remaining time slot if any
    if (currentTime < facilityEndTime) {
      availableSlots.push({
        startTime: minutesToTime(currentTime),
        endTime: minutesToTime(facilityEndTime),
      });
    }

    result.push({
      date,
      availableSlots,
    });
  }

  return result;
};

// Create booking
const createBooking = async (
  userId: string,
  payload: Omit<IBooking, "user">,
): Promise<IBooking> => {
  // Check if facility exists
  const facility = await Facility.findById(payload.facility);
  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
    
  }

  // Check if the booking date is in the past
  const bookingDate = new Date(payload.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (bookingDate < today) {
    throw new AppError(httpStatus.BAD_REQUEST, "Cannot book for past dates");
  }

  // Validate time format and logic
  const startMinutes = timeToMinutes(payload.startTime);
  const endMinutes = timeToMinutes(payload.endTime);

  if (endMinutes <= startMinutes) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "End time must be after start time",
    );
  }

  // Get existing bookings for this facility on this date
  const existingBookings = await Booking.find({
    facility: payload.facility,
    date: payload.date,
    isBooked: { $ne: "canceled" },
  });

  // Check for overlaps
  if (hasOverlap(payload.startTime, payload.endTime, existingBookings)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This time slot is already booked. Please choose another time.",
    );
  }

  // Create booking
  const bookingData = {
    ...payload,
    user: new Types.ObjectId(userId),
  };

  const result = await Booking.create(bookingData);
  return result;
};

// Get all bookings with filtering
const getAllBookings = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(Booking.find(), query)
    .search(bookingSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookingQuery.modelQuery;
  const meta = await bookingQuery.countTotal();

  return {
    meta,
    data: result,
  };
};

// Get user's bookings
const getUserBookings = async (userId: string): Promise<IBooking[]> => {
  const result = await Booking.find({ user: userId });
  return result;
};

// Cancel booking
const cancelBooking = async (
  bookingId: string,
  userId: string,
): Promise<IBooking> => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
    
  }

  // Check if user owns this booking
  if (booking.user.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can only cancel your own bookings",
    );
  }

  // Check if already canceled
  if (booking.isBooked === "canceled") {
    throw new AppError(httpStatus.BAD_REQUEST, "Booking is already canceled");
  }

  const result = await Booking.findByIdAndUpdate(
    bookingId,
    { isBooked: "canceled" },
    { new: true },
  );

  return result!;
};

export const BookingService = {
  checkAvailability,
  createBooking,
  getAllBookings,
  getUserBookings,
  cancelBooking,
};
