import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { FacilityRoutes } from "../modules/facility/facility.routes";
import { BookingRoutes } from "../modules/booking/booking.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/facility",
    route: FacilityRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
