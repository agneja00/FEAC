import axiosInstance from "@/config/axios";
import { Business, NewBusiness } from "./types";

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

export const sendBusinessEmail = async (
  formData: NewBusiness,
): Promise<void> => {
  try {
    await axiosInstance.post("/businesses", formData);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
