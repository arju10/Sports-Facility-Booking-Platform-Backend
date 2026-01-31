"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const booking_model_1 = require("./booking.model");
const facility_model_1 = require("../facility/facility.model");
const QueryBuilder_1 = __importDefault(require("../../utils/QueryBuilder"));
const bookingSearchableFields = ["date", "isBooked"];
// Helper function to convert time string to minutes
const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};
// Helper function to convert minutes to time string
const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
};
// Check if booking overlaps with existing bookings
const hasOverlap = (startTime, endTime, existingBookings) => {
    const newStart = timeToMinutes(startTime);
    const newEnd = timeToMinutes(endTime);
    for (const booking of existingBookings) {
        if (booking.isBooked === "canceled")
            continue;
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
const checkAvailability = async (date, facilityId) => {
    // Get facilities (either specific one or all)
    const facilities = facilityId
        ? [await facility_model_1.Facility.findById(facilityId)]
        : await facility_model_1.Facility.find();
    if (!facilities.length || facilities[0] === null) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No facilities found");
    }
    const result = [];
    for (const facility of facilities) {
        if (!facility)
            continue;
        // Get all bookings for this facility on the specified date
        const bookings = await booking_model_1.Booking.find({
            facility: facility._id,
            date,
            isBooked: { $ne: "canceled" },
        }).sort({ startTime: 1 });
        // Default facility hours (assuming 24-hour operation)
        const facilityStartTime = 0; // 00:00
        const facilityEndTime = 24 * 60; // 24:00
        const availableSlots = [];
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
const createBooking = async (userId, payload) => {
    // Check if facility exists
    const facility = await facility_model_1.Facility.findById(payload.facility);
    if (!facility) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Facility not found");
    }
    // Check if the booking date is in the past
    const bookingDate = new Date(payload.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Cannot book for past dates");
    }
    // Validate time format and logic
    const startMinutes = timeToMinutes(payload.startTime);
    const endMinutes = timeToMinutes(payload.endTime);
    if (endMinutes <= startMinutes) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "End time must be after start time");
    }
    // Get existing bookings for this facility on this date
    const existingBookings = await booking_model_1.Booking.find({
        facility: payload.facility,
        date: payload.date,
        isBooked: { $ne: "canceled" },
    });
    // Check for overlaps
    if (hasOverlap(payload.startTime, payload.endTime, existingBookings)) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "This time slot is already booked. Please choose another time.");
    }
    // Create booking
    const bookingData = {
        ...payload,
        user: new mongoose_1.Types.ObjectId(userId),
    };
    const result = await booking_model_1.Booking.create(bookingData);
    return result;
};
// Get all bookings with filtering
const getAllBookings = async (query) => {
    const bookingQuery = new QueryBuilder_1.default(booking_model_1.Booking.find(), query)
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
const getUserBookings = async (userId) => {
    const result = await booking_model_1.Booking.find({ user: userId });
    return result;
};
// Cancel booking
const cancelBooking = async (bookingId, userId) => {
    const booking = await booking_model_1.Booking.findById(bookingId);
    if (!booking) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Booking not found");
    }
    // Check if user owns this booking
    if (booking.user.toString() !== userId) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You can only cancel your own bookings");
    }
    // Check if already canceled
    if (booking.isBooked === "canceled") {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Booking is already canceled");
    }
    const result = await booking_model_1.Booking.findByIdAndUpdate(bookingId, { isBooked: "canceled" }, { new: true });
    return result;
};
exports.BookingService = {
    checkAvailability,
    createBooking,
    getAllBookings,
    getUserBookings,
    cancelBooking,
};
//# sourceMappingURL=booking.service.js.map