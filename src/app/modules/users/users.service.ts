import config from '../../../config';
import { TUser } from './users.interface';
import { User } from './users.model';

// Create Single User  ==== API: ("/api/auth/signup") === Method :[ POST]
const registerUserIntoDB = async (payload: TUser) => {
  const newUserData = await User.create(payload);
  return newUserData;
};

export const UserServices = {
  registerUserIntoDB,
};
