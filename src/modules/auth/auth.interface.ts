export interface ILoginUser {
  email: string;
  password: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IAuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    address: string;
  };
}
