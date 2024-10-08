import { Model } from 'mongoose';
import { USER_ROLE } from './users.constant';

export type TUser = {
  _id: any;
  name: string;
  email: string;
  password: string;
  needsPasswordChange?: boolean;
  passwordChangedAt?: Date;
  phone: string;
  role: 'user' | 'admin';
  address: string;
};

export interface UserModel extends Model<TUser> {
  isUserExistsById: any;
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
