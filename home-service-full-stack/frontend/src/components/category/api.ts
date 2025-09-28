import axiosInstance from "@/config/axios";
import { ICategory } from "./types";

export const fetchCategories = async (lang: string): Promise<ICategory[]> => {
  try {
    const response = await axiosInstance.get(`/${lang}/categories`);
    return response.data;
  } catch {
    throw new Error("Failed to fetch categories");
  }
};

export const createCategory = async (
  lang: string,
  categoryData: Omit<ICategory, "_id">,
): Promise<ICategory> => {
  const response = await axiosInstance.post(
    `/${lang}/categories`,
    categoryData,
  );
  return response.data;
};
