"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_constant_1 = require("../users/users.constant");
const booking_validation_1 = require("./booking.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.post('/bookings', (0, auth_1.default)(users_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(booking_validation_1.BookingValidations.createBookingZodSchema), booking_controller_1.BookingController.createBooking);
router.get('/check-availability');
router.get('/bookings', (0, auth_1.default)(users_constant_1.USER_ROLE.admin), booking_controller_1.BookingController.getAllBookings);
// View Bookings by User (User Only)
router.get('/bookings/user', (0, auth_1.default)(users_constant_1.USER_ROLE.user), booking_controller_1.BookingController.getBookingsByUser);
// Cancel a Booking (User Only)
router.delete('/bookings/:id', (0, auth_1.default)(users_constant_1.USER_ROLE.user), booking_controller_1.BookingController.cancelBooking);
exports.BookingRoutes = router;
