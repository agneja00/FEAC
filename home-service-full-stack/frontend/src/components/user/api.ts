import { LoginRequest, LoginResponse, RegisterRequest } from "./types";
import axiosInstance from "@/config/axios";

export const loginUser = async (user: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post(`/auth/login`, user);
  return await response.data;
};

export const registerUser = async (user: RegisterRequest): Promise<void> => {
  const response = await axiosInstance.post(`/auth/register`, user);
  return await response.data;
};
