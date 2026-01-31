"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_service_1 = require("./booking.service");
// Check availability
const checkAvailability = (0, catchAsync_1.default)(async (req, res) => {
    const { date, facility } = req.query;
    const result = await booking_service_1.BookingService.checkAvailability(date, facility);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Availability checked successfully",
        data: result,
    });
});
// Create booking
const createBooking = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.userId;
    const result = await booking_service_1.BookingService.createBooking(userId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Booking created successfully",
        data: result,
    });
});
// Get all bookings (Admin only)
const getAllBookings = (0, catchAsync_1.default)(async (req, res) => {
    const result = await booking_service_1.BookingService.getAllBookings(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Bookings retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});
// Get user's bookings
const getUserBookings = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.userId;
    const result = await booking_service_1.BookingService.getUserBookings(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User bookings retrieved successfully",
        data: result,
    });
});
// Cancel booking
const cancelBooking = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.userId;
    const bookingId = req.params.id;
    const result = await booking_service_1.BookingService.cancelBooking(bookingId, userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Booking canceled successfully",
        data: result,
    });
});
exports.BookingController = {
    checkAvailability,
    createBooking,
    getAllBookings,
    getUserBookings,
    cancelBooking,
};
//# sourceMappingURL=booking.controller.js.map