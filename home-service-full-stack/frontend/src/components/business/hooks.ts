import { useQuery } from "@tanstack/react-query";
import { fetchBusinessById, fetchBusinesses } from "./api";
import { useParams } from "react-router-dom";
import { Business } from "./types";

export const BUSINESS_KEY = "BUSINESS";

export const useBusinesses = () => {
  return useQuery<Business[]>({
    queryKey: [BUSINESS_KEY],
    queryFn: fetchBusinesses,
  });
};

export const BUSINESS_ID_KEY = "BUSINESS_ID";

export const useBusinessById = (businessId: string) => {
  return useQuery<Business>({
    queryKey: [BUSINESS_ID_KEY, businessId],
    queryFn: () => fetchBusinessById(businessId),
  });
};

const useCurrentBusiness = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useBusinessById(id!);

  return { currentBusiness: data };
};

export default useCurrentBusiness;
