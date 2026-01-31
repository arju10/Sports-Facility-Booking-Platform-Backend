import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Signup route
router.post(
  "/signup",
  validateRequest(AuthValidation.signupValidationSchema),
  AuthController.signup,
);

// Login route
router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login,
);

// Change password route (requires authentication)
router.post(
  "/change-password",
  auth("admin", "user"),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword,
);

export const AuthRoutes = router;
