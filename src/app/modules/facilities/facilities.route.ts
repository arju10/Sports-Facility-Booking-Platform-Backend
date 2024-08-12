import express from 'express';
import { FacilityControllers } from './facilities.controller';

const router = express.Router();

router.post('/', FacilityControllers.createFacility);

export const FacilityRouters = router;
