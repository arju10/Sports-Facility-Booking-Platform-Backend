import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { handleNotFound } from '../../utils/handleNotFound';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './users.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDB(req.body);

  handleNotFound(res, result, 'No Data Found');

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered Successfully',
    data: result,
  });
});

export const UserControllers = {
  registerUser,
};
