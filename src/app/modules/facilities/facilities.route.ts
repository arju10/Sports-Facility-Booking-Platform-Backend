import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidations } from './facilities.validation';
import { FacilityControllers } from './facilities.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(FacilityValidations.createFacilityValidationSchema),
  FacilityControllers.createFacility,
);
router.get('/', FacilityControllers.getAllFacilities);

export const FacilityRouters = router;
