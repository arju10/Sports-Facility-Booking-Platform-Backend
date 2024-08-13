import { TUser } from './users.interface';
import { User } from './users.model';

const registerUserIntoDB = async (payload: TUser) => {
  const newUserData = await User.create(payload);
  return newUserData;
};

export const UserServices = {
  registerUserIntoDB,
};
