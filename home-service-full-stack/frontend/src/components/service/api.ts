import axiosInstance from "@/config/axios";
import { Service, NewService, ServiceWithFavorite } from "./types";

export const fetchServices = async (
  lang: string,
): Promise<ServiceWithFavorite[]> => {
  const response = await axiosInstance.get(`/${lang}/services`);
  return response.data.map((service: Service) => ({
    ...service,
    isFavorite: false,
  }));
};

export const fetchServiceById = async (
  lang: string,
  serviceId: string,
): Promise<ServiceWithFavorite> => {
  const response = await axiosInstance.get(`/${lang}/services/${serviceId}`);
  return { ...response.data, isFavorite: false };
};

export const sendServiceEmail = async (
  lang: string,
  formData: NewService,
): Promise<void> => {
  await axiosInstance.post(`/${lang}/services`, formData);
};

export const fetchFavoriteServices = async (
  lang: string,
  email: string,
): Promise<ServiceWithFavorite[]> => {
  const response = await axiosInstance.get(
    `/${lang}/services/user/${email}/favorites`,
  );
  return response.data.map((service: Service) => ({
    ...service,
    isFavorite: true,
  }));
};

export const toggleFavorite = async (
  lang: string,
  email: string,
  serviceId: string,
): Promise<ServiceWithFavorite> => {
  const response = await axiosInstance.post(
    `/${lang}/services/user/${email}/favorites`,
    { email, serviceId },
  );
  return response.data;
};
