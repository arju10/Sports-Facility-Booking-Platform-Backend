// import { Request, Response, NextFunction } from 'express';
// import httpStatus from 'http-status';
// import { AuthServices } from './auth.service';
// import { TLoginUser } from './auth.interface';
// import AppError from '../../error/AppError';
// import catchAsync from '../../utils/catchAsync';
// import sendResponse from '../../utils/sendResponse';
// import { TUser } from '../users/users.interface';

// const loginUser = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const payload: TLoginUser = req.body;
//       const result = await AuthServices.loginUser(payload);

//       res.status(result.statusCode).json(result);
//     } catch (error) {
//       next(error);
//     }
//   },
// );

// const changePassword = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const userData = req.user;
//     const payload = req.body;

//     await AuthServices.changePassword(userData, payload);

//     res.status(httpStatus.NO_CONTENT).send();
//   } catch (error) {
//     next(error);
//   }
// };

// const refreshToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { token } = req.body;
//     const result = await AuthServices.refreshToken(token);

//     res.status(httpStatus.OK).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const AuthController = {
//   loginUser,
//   changePassword,
//   refreshToken,
// };

// Acceptance 2nd
// import httpStatus from 'http-status';
// import catchAsync from '../../utils/catchAsync';
// import sendResponse from '../../utils/sendResponse';
// import { AuthServices } from './auth.service';
// import config from '../../../config';

// const loginUser = catchAsync(async (req, res) => {
//   const result = await AuthServices.loginUser(req.body);
//   // const { refreshToken, accessToken, needsPasswordChange } = result;

//   res.cookie('refreshToken', refreshToken, {
//     secure: config.NODE_ENV === 'production',
//     httpOnly: true,
//   });

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User is logged in succesfully!',
//     data: result,
//   });
// });

// const changePassword = catchAsync(async (req, res) => {
//   const { ...passwordData } = req.body;

//   const result = await AuthServices.changePassword(req.user, passwordData);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Password is updated succesfully!',
//     data: result,
//   });
// });

// const refreshToken = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies;
//   const result = await AuthServices.refreshToken(refreshToken);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Access token is retrieved succesfully!',
//     data: result,
//   });
// });

// export const AuthControllers = {
//   loginUser,
//   changePassword,
//   refreshToken,
// };

// 3rd test
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
