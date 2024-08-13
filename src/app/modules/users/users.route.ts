import express from 'express';

import { UserControllers } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './users.validation';
import { AuthValidation } from '../auth/auth.validation';

const router = express.Router();

// router.post(
//   '/signup',
//   validateRequest(UserValidations.createUserZodValidationSchema),
//   UserControllers.registerUser,
// );

export const UserRoutes = router;
