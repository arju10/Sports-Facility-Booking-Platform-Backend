import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = express.Router();

// Check availability (Public - can check with or without facility ID)
router.get(
  "/check-availability",
  validateRequest(BookingValidation.checkAvailabilityValidationSchema),
  BookingController.checkAvailability,
);

// Create booking (User/Admin)
router.post(
  "/",
  auth("user", "admin"),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingController.createBooking,
);

// Get all bookings (Admin only)
router.get("/", auth("admin"), BookingController.getAllBookings);

// Get user's own bookings (User/Admin)
router.get("/user", auth("user", "admin"), BookingController.getUserBookings);

// Cancel booking (User/Admin - can only cancel own bookings)
router.delete("/:id", auth("user", "admin"), BookingController.cancelBooking);

export const BookingRoutes = router;
