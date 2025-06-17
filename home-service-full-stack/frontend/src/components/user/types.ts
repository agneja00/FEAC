export interface IUser {
  _id: string;
  name: string;
  surname?: string;
  age?: number;
  country?: string;
  city?: string;
  email: string;
  photo?: string;
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

export interface IUpdateUserRequest {
  name: string;
  surname?: string;
  age?: number | null;
  country?: string;
  city?: string;
  email: string;
  photo?: File | null;
  password?: string;
}

export interface IRegisterRequest extends ILoginRequest {
  name: string;
}

export interface IRegisterFormValues extends IRegisterRequest {
  passwordRepeat: string;
}
