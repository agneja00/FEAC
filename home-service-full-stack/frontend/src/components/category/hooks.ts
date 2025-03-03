import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "./api";
import { useParams } from "react-router-dom";
import { Category } from "./types";

export const CATEGORY_KEY = "CATEGORY_KEY";

export const useCategories = () => {
  const { lang } = useParams<{ lang: string }>();
  return useQuery<Category[]>({
    queryKey: [CATEGORY_KEY, lang],
    queryFn: () => fetchCategories(lang || "en"),
  });
};
