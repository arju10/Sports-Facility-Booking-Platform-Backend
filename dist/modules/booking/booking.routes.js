"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
// Check availability (Public - can check with or without facility ID)
router.get("/check-availability", (0, validateRequest_1.default)(booking_validation_1.BookingValidation.checkAvailabilityValidationSchema), booking_controller_1.BookingController.checkAvailability);
// Create booking (User/Admin)
router.post("/", (0, auth_1.default)("user", "admin"), (0, validateRequest_1.default)(booking_validation_1.BookingValidation.createBookingValidationSchema), booking_controller_1.BookingController.createBooking);
// Get all bookings (Admin only)
router.get("/", (0, auth_1.default)("admin"), booking_controller_1.BookingController.getAllBookings);
// Get user's own bookings (User/Admin)
router.get("/user", (0, auth_1.default)("user", "admin"), booking_controller_1.BookingController.getUserBookings);
// Cancel booking (User/Admin - can only cancel own bookings)
router.delete("/:id", (0, auth_1.default)("user", "admin"), booking_controller_1.BookingController.cancelBooking);
exports.BookingRoutes = router;
//# sourceMappingURL=booking.routes.js.map