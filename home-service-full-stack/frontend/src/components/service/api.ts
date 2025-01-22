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
    console.error("Error sending email:", error);
    throw error;
  }
};
