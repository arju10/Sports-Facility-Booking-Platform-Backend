import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

// Check availability
const checkAvailability = catchAsync(async (req, res) => {
  const { date, facility } = req.query;
  const result = await BookingService.checkAvailability(
    date as string,
    facility as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Availability checked successfully",
    data: result,
  });
});

// Create booking
const createBooking = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const result = await BookingService.createBooking(userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Booking created successfully",
    data: result,
  });
});

// Get all bookings (Admin only)
const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookings(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

// Get user's bookings
const getUserBookings = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const result = await BookingService.getUserBookings(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

// Cancel booking
const cancelBooking = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const bookingId = req.params.id;
  const result = await BookingService.cancelBooking(bookingId, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking canceled successfully",
    data: result,
  });
});

export const BookingController = {
  checkAvailability,
  createBooking,
  getAllBookings,
  getUserBookings,
  cancelBooking,
};
