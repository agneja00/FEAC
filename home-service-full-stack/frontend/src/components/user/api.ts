import { ILoginRequest, ILoginResponse, IRegisterRequest } from "./types";
import axiosInstance from "@/config/axios";

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
