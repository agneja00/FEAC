import axiosInstance from "@/config/axios";
import { IService, NewService, ServiceWithFavorite } from "./types";

export const fetchServices = async (
  lang: string,
): Promise<ServiceWithFavorite[]> => {
  const response = await axiosInstance.get(`/${lang}/services`);
  return response.data.map((service: IService) => ({
    ...service,
    isFavorite: false,
  }));
};

export const fetchServiceById = async (
  lang: string,
  serviceId: string,
): Promise<ServiceWithFavorite> => {
  const response = await axiosInstance.get(`/${lang}/service/${serviceId}`);
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

  return response.data.map((service: IService) => ({
    ...service,
    isFavorite: true,
    name: service.translations?.name?.[lang] || service.name,
    category: service.translations?.category?.[lang] || service.category,
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
