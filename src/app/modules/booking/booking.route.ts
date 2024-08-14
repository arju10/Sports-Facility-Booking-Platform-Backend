import { BookingService } from './booking.service';
import { Router } from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/users.constant';
import { BookingValidations } from './booking.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/bookings',
  auth(USER_ROLE.user),
  validateRequest(BookingValidations.createBookingZodSchema),
  BookingController.createBooking,
);
router.get(
  '/check-availability',
  // auth(USER_ROLE.user),
  // validateRequest(BookingValidations.createBookingZodSchema),
);

router.get(
  '/bookings',
  auth(USER_ROLE.admin),
  BookingController.getAllBookings,
);

// View Bookings by User (User Only)
router.get(
  '/bookings/user',
  auth(USER_ROLE.user),
  BookingController.getBookingsByUser 
);

// Cancel a Booking (User Only)
router.delete(
  '/bookings/:id',
  auth(USER_ROLE.user),
  BookingController.cancelBooking 
);

export const BookingRoutes = router;
