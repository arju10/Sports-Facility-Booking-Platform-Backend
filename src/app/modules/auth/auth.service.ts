import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../users/users.model';
import config from '../../../config';
import { createToken } from './auth.utils';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  // Checking if the user exists
  const user = await User.isUserExistsByEmail(payload.email);
  console.log(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // Checking if the password is correct
  const isPasswordCorrect = await User.isPasswordMatched(
    payload.password,
    user.password,
  );
  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match!');
  }

  // Creating JWT tokens
  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  // Returning the response
  return {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
    },
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // Checking if the user exists
  const user = await User.isUserExistsByEmail(userData.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // Checking if the password is correct
  const isPasswordCorrect = await User.isPasswordMatched(
    payload.oldPassword,
    user.password,
  );
  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match!');
  }

  // Hashing new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { _id: userData.userId },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // Checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
  const { userId, iat } = decoded;

  // Checking if the user exists
  const user = await User.isUserExistsByEmail(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
