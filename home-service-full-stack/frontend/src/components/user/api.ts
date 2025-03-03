import { LoginRequest, LoginResponse, RegisterRequest } from "./types";
import axiosInstance from "@/config/axios";

export const loginUser = async (
  formValues: LoginRequest,
  lang: string,
): Promise<LoginResponse> => {
  const response = await axiosInstance.post(`/${lang}/auth/login`, formValues); // Include lang in the URL
  return response.data;
};

export const registerUser = async (
  user: RegisterRequest,
  lang: string,
): Promise<void> => {
  const response = await axiosInstance.post(`/${lang}/auth/register`, user);
  return response.data;
};
