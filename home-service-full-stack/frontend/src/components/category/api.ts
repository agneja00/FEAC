import axiosInstance from "@/config/axios";
import { Category } from "./types";

export const fetchCategories = async (lang: string): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get(`/${lang}/categories`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

export const createCategory = async (
  lang: string,
  categoryData: Omit<Category, "_id">,
): Promise<Category> => {
  const response = await axiosInstance.post(
    `/${lang}/categories`,
    categoryData,
  );
  return response.data;
};
