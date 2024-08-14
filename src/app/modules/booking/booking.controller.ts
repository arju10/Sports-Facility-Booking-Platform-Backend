import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BookingService } from './booking.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { FacilityServices } from '../facilities/facilities.service';
import { handleNotFound } from '../../utils/handleNotFound';

// Check Availabkle 
const checkAvailableBookingSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilityServices.getAllFacilitiesFromDB(req.query);

  // Check if data is found
  if (handleNotFound(res, result, 'No Data Found')) {
    return;
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facilities retrived successfully',
    data: result,
  });
});



const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBookingIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  });
});

// View All Bookings (Admin Only)
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookingDataFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: result.result,
    meta: result.meta
  });
});

// View Bookings by User (User Only)
const getBookingsByUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id; // Assuming user ID is available in req.user
  console.log(`Fetching bookings for user ID: ${userId}`); // Log the user ID
  const result = await BookingService.getBookingsByUserIdFromDB(userId);
  console.log('Bookings retrieved:', result); // Log the result
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

// const getBookingsByUser = catchAsync(async (req: Request, res: Response) => {
//   if (!req.user || !req.user._id) {
//     return res.status(httpStatus.BAD_REQUEST).json({
//       success: false,
//       message: 'User ID is missing',
//     });
//   }

//   const userId = req.user._id; // Ensure req.user._id is available
//   console.log(`Fetching bookings for user ID: ${userId}`); // Log the user ID
  
//   const result = await BookingService.getBookingsByUserIdFromDB(userId);
//   console.log('Bookings retrieved:', result); // Log the result

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Bookings retrieved successfully',
//     data: result,
//   });
// });


// Cancel a Booking (User Only)
const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingId = req.params.id;
  const result = await BookingService.cancelBookingFromDB(bookingId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking cancelled successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getBookingsByUser,
  cancelBooking,
  checkAvailableBookingSlots
};

