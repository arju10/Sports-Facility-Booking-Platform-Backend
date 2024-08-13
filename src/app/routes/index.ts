// Application routes
import express from 'express';
import { FacilityRouters } from '../modules/facilities/facilities.route';
import { UserRoutes } from '../modules/users/users.route';
import { AuthRoutes } from '../modules/auth/auth.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
