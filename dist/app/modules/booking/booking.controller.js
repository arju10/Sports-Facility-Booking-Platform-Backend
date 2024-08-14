"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const booking_service_1 = require("./booking.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const facilities_service_1 = require("../facilities/facilities.service");
const handleNotFound_1 = require("../../utils/handleNotFound");
// Check Availabkle
const checkAvailableBookingSlots = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facilities_service_1.FacilityServices.getAllFacilitiesFromDB(req.query);
    // Check if data is found
    if ((0, handleNotFound_1.handleNotFound)(res, result, 'No Data Found')) {
        return;
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Facilities retrived successfully',
        data: result,
    });
}));
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.createBookingIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Booking created successfully',
        data: result,
    });
}));
// View All Bookings (Admin Only)
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.getAllBookingDataFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bookings retrieved successfully',
        data: result.result,
        meta: result.meta,
    });
}));
// View Bookings by User (User Only)
const getBookingsByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id; // Assuming user ID is available in req.user
    const result = yield booking_service_1.BookingService.getBookingsByUserIdFromDB(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bookings retrieved successfully',
        data: result,
    });
}));
// Cancel a Booking (User Only)
const cancelBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = req.params.id;
    const result = yield booking_service_1.BookingService.cancelBookingFromDB(bookingId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Booking cancelled successfully',
        data: result,
    });
}));
exports.BookingController = {
    createBooking,
    getAllBookings,
    getBookingsByUser,
    cancelBooking,
    checkAvailableBookingSlots,
};
