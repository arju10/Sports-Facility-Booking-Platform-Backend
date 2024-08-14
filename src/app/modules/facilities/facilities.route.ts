import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidations } from './facilities.validation';
import { FacilityControllers } from './facilities.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/users.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidations.createFacilityValidationSchema),
  FacilityControllers.createFacility,
);
router.get('/:id', FacilityControllers.getSingleFacility);
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidations.updateFacilityValidationSchema),
  FacilityControllers.updateFacility,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  FacilityControllers.deleteSingleFacility,
);
router.get('/', FacilityControllers.getAllFacilities);

export const FacilityRouters = router;
