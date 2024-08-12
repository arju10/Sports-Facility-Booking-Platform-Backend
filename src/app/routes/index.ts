// Application routes
import express from 'express';
import { FacilityRouters } from '../modules/facilities/facilities.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/facility',
    route: FacilityRouters,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
