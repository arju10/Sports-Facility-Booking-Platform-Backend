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
exports.BookingService = void 0;
const booking_model_1 = require("./booking.model");
const facilities_model_1 = require("../facilities/facilities.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const booking_constant_1 = require("./booking.constant");
const facilities_constant_1 = require("../facilities/facilities.constant");
// Check available slots
const checkAllAvailableBookingsSlot = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const facilityQuery = new QueryBuilder_1.default(facilities_model_1.Facility.find(), query)
        .search(facilities_constant_1.FacilitySearchbleFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield facilityQuery.modelQuery;
    const meta = yield facilityQuery.countTotal();
    return {
        meta,
        result,
    };
});
// Check if a time slot is within the facility's available time and day
const isTimeSlotAvailable = (facilityId, 
// date: string,
startTime, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    const facility = yield facilities_model_1.Facility.findById(facilityId);
    if (!facility) {
        throw new Error('Facility not found');
    }
    // Check if the start and end times are within the facility's available hours
    if (startTime < facility.startTime || endTime > facility.endTime) {
        return false;
    }
    return true;
});
// Create new Booking
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the booking time slot is available for the facility
    const isAvailable = yield isTimeSlotAvailable(payload.facility, payload.startTime, payload.endTime);
    if (!isAvailable) {
        throw new Error('The selected time slot is not available for the facility.');
    }
    // Create the booking
    const result = (yield (yield booking_model_1.Booking.create(payload)).populate('facility')).populate('user');
    return result;
});
// Get All Booking Data with pagination ==== API: ("/api/bookings//?page=1&limit=10") === Method :[ GET]
const getAllBookingDataFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingDataQuery = new QueryBuilder_1.default(booking_model_1.Booking.find(), query)
        .search(booking_constant_1.BookingSearchbleFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield bookingDataQuery.modelQuery;
    const meta = yield bookingDataQuery.countTotal();
    return {
        meta,
        result,
    };
});
// Get Bookings by User ID
const getBookingsByUserIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ user: userId })
        .populate('facility')
        .populate('user'); // Adjust fields as necessary
    return result;
});
// Cancel Booking by ID
const cancelBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isBooked: 'canceled' }, { new: true });
    return result;
});
exports.BookingService = {
    createBookingIntoDB,
    getAllBookingDataFromDB,
    getBookingsByUserIdFromDB,
    cancelBookingFromDB,
    checkAllAvailableBookingsSlot,
};
