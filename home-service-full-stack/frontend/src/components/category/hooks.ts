import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "./api";

export const CATEGORY_KEY = "CATEGORY_KEY";

export const useCategories = () => {
  return useQuery({
    queryKey: [CATEGORY_KEY],
    queryFn: fetchCategories,
  });
};
