import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../users/users.validation';
import { UserControllers } from '../users/users.controller';

const router = Router();
router.post(
  '/signup',
  validateRequest(UserValidations.createUserZodValidationSchema),
  UserControllers.registerUser,
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);
router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);

export const AuthRoutes = router;
