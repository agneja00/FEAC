import axiosInstance from "@/config/axios";
import { Business } from "./types";

export const fetchBusinesses = async (): Promise<Business[]> => {
  const response = await axiosInstance.get("/businesses");
  return await response.data;
};

export const fetchBusinessById = async (
  businessId: string,
): Promise<Business> => {
  try {
    const response = await axiosInstance.get(`/businesses/${businessId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
