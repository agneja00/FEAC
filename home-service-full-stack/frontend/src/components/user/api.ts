import axiosInstance from "@/config/axios";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IUpdateUserRequest,
  IUser,
} from "./types";

export const loginUser = async (
  formValues: ILoginRequest,
  lang: string,
): Promise<ILoginResponse> => {
  const response = await axiosInstance.post(`/${lang}/auth/login`, formValues);
  return response.data;
};

export const registerUser = async (
  user: IRegisterRequest,
  lang: string,
): Promise<void> => {
  const response = await axiosInstance.post(`/${lang}/auth/register`, user);
  return response.data;
};

export const getUserByEmail = async (
  email: string,
  lang: string,
): Promise<IUser> => {
  const response = await axiosInstance.get(`/${lang}/user/${email}`);
  return response.data;
};

export const updateUser = async (
  email: string,
  lang: string,
  data: IUpdateUserRequest,
): Promise<IUser> => {
  const response = await axiosInstance.put(`/${lang}/user/${email}`, data);
  return response.data;
};

export const uploadAvatar = async (
  email: string,
  lang: string,
  file: File,
): Promise<IUser> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await axiosInstance.post(
    `/${lang}/user/${email}/avatar`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
};
