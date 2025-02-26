import axiosInstance from "@/config/axios";
import { Service, NewService } from "./types";

export const fetchServices = async (): Promise<Service[]> => {
  const response = await axiosInstance.get("/services");
  return await response.data;
};

export const fetchServiceById = async (serviceId: string): Promise<Service> => {
  try {
    const response = await axiosInstance.get(`/services/${serviceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendServiceEmail = async (formData: NewService): Promise<void> => {
  try {
    await axiosInstance.post("/services", formData);
  } catch (error) {
    throw error;
  }
};

export const fetchFavoriteServices = async (
  email: string,
): Promise<Service[]> => {
  const response = await axiosInstance.get(`/services/user/${email}/favorites`);
  return response.data;
};

export const toggleFavorite = async (
  email: string,
  serviceId: string,
): Promise<Service> => {
  try {
    const response = await axiosInstance.post(
      `/services/user/${email}/favorites`,
      {
        email,
        serviceId,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "Failed to toggle favorite: " +
        (error instanceof Error ? error.message : "Unknown error"),
    );
  }
};
