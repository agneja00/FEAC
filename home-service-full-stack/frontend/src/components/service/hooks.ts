import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchServiceById, fetchServices, toggleFavorite } from "./api";
import { useParams } from "react-router-dom";
import { Service } from "./types";

export const SERVICE_KEY = "SERVICE";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SERVICE_KEY] });
    },
  });
};
