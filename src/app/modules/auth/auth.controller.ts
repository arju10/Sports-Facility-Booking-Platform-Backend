import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  // Use sendResponse for consistent response formatting
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
    token: result.token, // Include token in the response
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.changePassword(req.user, req.body);

  // Send no content response
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  // Use sendResponse for consistent response formatting
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
};
