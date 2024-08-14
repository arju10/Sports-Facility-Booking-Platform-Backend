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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const facilities_model_1 = require("../facilities/facilities.model");
const bookingSchema = new mongoose_1.Schema({
    date: { type: String },
    days: [
        {
            type: String,
            enum: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            required: true,
        },
    ],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    facility: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Facility', required: true },
    payableAmount: { type: Number },
    isBooked: {
        type: String,
        enum: ['confirmed', 'unconfirmed', 'canceled'],
        default: 'unconfirmed',
    },
}, {
    timestamps: true,
});
// Pre-save hook to calculate payableAmount
bookingSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const booking = this;
        // Fetch the facility to get the price per hour
        const facility = yield facilities_model_1.Facility.findById(booking.facility);
        if (!facility) {
            return next(new Error('Facility not found'));
        }
        // Convert startTime and endTime to Date objects
        const startDateTime = new Date(`${booking.date}T${booking.startTime}:00`);
        const endDateTime = new Date(`${booking.date}T${booking.endTime}:00`);
        // Calculate duration in hours
        const durationInHours = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
        // Calculate payableAmount
        booking.payableAmount = durationInHours * facility.pricePerHour;
        next();
    });
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
