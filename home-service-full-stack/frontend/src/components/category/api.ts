import axiosInstance from "@/config/axios";
import { Category } from "./types";

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get("/categories");
  return await response.data;
};
