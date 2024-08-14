import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidations } from './booking.validation';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/users.constant';

const router = Router();

// router.get("/check-availability", validateRequest(BookingValidations.checkAvailabilityZodSchema), BookingController.checkAvailability);
router.post(
  '/',
  validateRequest(BookingValidations.createBookingZodSchema),
  BookingController.createBooking,
);
// router.get("/bookings", BookingController.getAllBookings);
// router.get("/bookings/user", BookingController.getUserBookings);
// router.delete("/bookings/:id", BookingController.cancelBooking);

export const BookingRoutes = router;
