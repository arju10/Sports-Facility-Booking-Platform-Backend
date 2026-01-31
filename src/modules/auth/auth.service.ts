// import httpStatus from "http-status";
// import bcrypt from "bcrypt";
// import { JwtPayload } from "jsonwebtoken";
// import config from "../../config";
// import AppError from "../../errors/AppError";
// import { User } from "../user/user.model";
// import { IUser } from "../user/user.interface";
// import { ILoginUser, IChangePassword, IAuthResponse } from "./auth.interface";
// import { createToken } from "./auth.utils";

// // Signup service
// const signup = async (payload: IUser): Promise<IAuthResponse> => {
//   // Check if user already exists
//   const existingUser = await User.isUserExistsByEmail(payload.email);
//   if (existingUser) {
//     throw new AppError(
//       httpStatus.CONFLICT,
//       "User with this email already exists",
//     );
//   }

//   // Check if phone already exists
//   const existingPhone = await User.findOne({ phone: payload.phone });
//   if (existingPhone) {
//     throw new AppError(
//       httpStatus.CONFLICT,
//       "User with this phone number already exists",
//     );
//   }

//   // Create user
//   const newUser = await User.create(payload);

//   // Create JWT token
//   const jwtPayload = {
//     userId: newUser._id!.toString(),
//     role: newUser.role,
//   };

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret,
//     config.jwt_access_expires_in,
//   );

//   return {
//     token: accessToken,
//     user: {
//       _id: newUser._id!.toString(),
//       name: newUser.name,
//       email: newUser.email,
//       phone: newUser.phone,
//       role: newUser.role,
//       address: newUser.address,
//     },
//   };
// };

// // Login service
// const login = async (payload: ILoginUser): Promise<IAuthResponse> => {
//   // Check if user exists
//   const user = await User.isUserExistsByEmail(payload.email);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User not found");
//   }

//   // Check if password matches
//   const isPasswordMatched = await User.isPasswordMatched(
//     payload.password,
//     user.password,
//   );
//   if (!isPasswordMatched) {
//     throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
//   }

//   // Create JWT token
//   const jwtPayload = {
//     userId: user._id!.toString(),
//     role: user.role,
//   };

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret,
//     config.jwt_access_expires_in,
//   );

//   return {
//     token: accessToken,
//     user: {
//       _id: user._id!.toString(),
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//       address: user.address,
//     },
//   };
// };

// // Change password service
// const changePassword = async (
//   userData: JwtPayload,
//   payload: IChangePassword,
// ): Promise<void> => {
//   // Check if user exists
//   const user = await User.isUserExistsById(userData.userId);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User not found");
//   }

//   // Check if old password matches
//   const isPasswordMatched = await User.isPasswordMatched(
//     payload.oldPassword,
//     user.password,
//   );
//   if (!isPasswordMatched) {
//     throw new AppError(httpStatus.UNAUTHORIZED, "Old password is incorrect");
//   }

//   // Hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     config.bcrypt_salt_rounds,
//   );

//   // Update password
//   await User.findByIdAndUpdate(userData.userId, {
//     password: newHashedPassword,
//     passwordChangedAt: new Date(),
//   });
// };

// export const AuthService = {
//   signup,
//   login,
//   changePassword,
// };

import httpStatus from "http-status";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";
import { ILoginUser, IChangePassword, IAuthResponse } from "./auth.interface";
import { createToken } from "./auth.utils";

/**
 * ============================================
 * SIGNUP SERVICE
 * ============================================
 * Register a new user
 * - Let MongoDB handle duplicate checks automatically
 * - MongoDB will throw error code 11000 for duplicates
 * - handleDuplicateError will format it nicely
 */
const signup = async (payload: IUser): Promise<IAuthResponse> => {
  // Simply try to create user - MongoDB handles duplicates
  const newUser = await User.create(payload);

  // Create JWT token
  const jwtPayload = {
    userId: newUser._id!.toString(),
    role: newUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  return {
    token: accessToken,
    user: {
      _id: newUser._id!.toString(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      address: newUser.address,
    },
  };
};

/**
 * ============================================
 * LOGIN SERVICE
 * ============================================
 * Authenticate user and return token
 */
const login = async (payload: ILoginUser): Promise<IAuthResponse> => {
  // Check if user exists
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if password matches
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  // Create JWT token
  const jwtPayload = {
    userId: user._id!.toString(),
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  return {
    token: accessToken,
    user: {
      _id: user._id!.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: user.address,
    },
  };
};

/**
 * ============================================
 * CHANGE PASSWORD SERVICE
 * ============================================
 * Update user's password
 */
const changePassword = async (
  userData: JwtPayload,
  payload: IChangePassword,
): Promise<void> => {
  // Check if user exists
  const user = await User.isUserExistsById(userData.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if old password matches
  const isPasswordMatched = await User.isPasswordMatched(
    payload.oldPassword,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password is incorrect");
  }

  // Hash new password
  const newHashedPassword = await bcryptjs.hash(
    payload.newPassword,
    config.bcrypt_salt_rounds,
  );

  // Update password
  await User.findByIdAndUpdate(userData.userId, {
    password: newHashedPassword,
    passwordChangedAt: new Date(),
  });
};

export const AuthService = {
  signup,
  login,
  changePassword,
};

/**
 * ============================================
 * WHAT CHANGED?
 * ============================================
 *
 * BEFORE:
 * - Manually checked for duplicate email
 * - Manually checked for duplicate phone
 * - Threw custom AppError for duplicates
 * - Result: Generic error message
 *
 * AFTER:
 * - Let User.create() attempt to save
 * - MongoDB throws error code 11000 if duplicate
 * - handleDuplicateError catches it automatically
 * - Result: Specific error showing which field is duplicate
 *
 * ============================================
 * ERROR RESPONSE COMPARISON:
 * ============================================
 *
 * OLD WAY:
 * {
 *   "success": false,
 *   "message": "User with this email already exists",
 *   "errorSources": [
 *     { "path": "", "message": "User with this email already exists" }
 *   ]
 * }
 *
 * NEW WAY:
 * {
 *   "success": false,
 *   "message": "Duplicate Entry",
 *   "errorSources": [
 *     { "path": "email", "message": "john@test.com already exists" }
 *   ]
 * }
 *
 * BENEFITS:
 * ✅ Shows which field is duplicate (email or phone)
 * ✅ Shows the actual duplicate value
 * ✅ Consistent with other duplicate errors
 * ✅ Less code to maintain
 * ✅ Handles both email AND phone duplicates automatically
 */
