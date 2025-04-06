export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  status: string;
  token: string;
  user: IUser;
}

export interface IRegisterRequest extends ILoginRequest {
  name: string;
}
