import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchServiceById,
  fetchServices,
  toggleFavorite,
  fetchFavoriteServices,
} from "./api";
import { useParams } from "react-router-dom";
import { Service } from "./types";

export const SERVICE_KEY = "SERVICE";
export const FAVORITE_KEY = "FAVORITE";

export const useServices = () => {
  return useQuery<Service[]>({
    queryKey: [SERVICE_KEY],
    queryFn: fetchServices,
  });
};

export const useServiceById = (serviceId: string) => {
  return useQuery<Service>({
    queryKey: [SERVICE_KEY, serviceId],
    queryFn: () => fetchServiceById(serviceId),
  });
};

export const useCurrentService = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useServiceById(id!);
  return { currentService: data };
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, serviceId }: { email: string; serviceId: string }) =>
      toggleFavorite(email, serviceId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [SERVICE_KEY] });
      queryClient.invalidateQueries({
        queryKey: [FAVORITE_KEY, variables.email],
        exact: true,
      });
    },
  });
};

export const useFavoriteServices = (email: string) => {
  return useQuery<Service[]>({
    queryKey: [FAVORITE_KEY, email],
    queryFn: () => fetchFavoriteServices(email),
    enabled: !!email,
  });
};
