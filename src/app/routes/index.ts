// Application routes
import express from 'express';
import { FacilityRouters } from '../modules/facilities/facilities.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookingRoutes } from '../modules/booking/booking.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/facility',
    route: FacilityRouters,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
