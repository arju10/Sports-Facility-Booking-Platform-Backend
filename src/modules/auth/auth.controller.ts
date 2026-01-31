import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

// Signup controller
const signup = catchAsync(async (req, res) => {
  const result = await AuthService.signup(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    token: result.token,
    data: result.user,
  });
});

// Login controller
const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: result.token,
    data: result.user,
  });
});

// Change password controller
const changePassword = catchAsync(async (req, res) => {
  await AuthService.changePassword(req.user!, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password changed successfully",
    data: null,
  });
});

export const AuthController = {
  signup,
  login,
  changePassword,
};
