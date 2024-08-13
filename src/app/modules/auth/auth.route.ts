import { Router } from 'express';
import { AuthValidation } from './auth.validation';

import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../users/users.validation';
import { UserControllers } from '../users/users.controller';
import { AuthControllers } from './auth.controller';

const router = Router();
router.post(
  '/signup',
  validateRequest(UserValidations.createUserZodValidationSchema),
  UserControllers.registerUser,
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
