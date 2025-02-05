import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchServiceById,
  fetchServices,
  toggleFavorite,
  fetchFavoriteServices,
} from "./api";
import { useParams } from "react-router-dom";
import { Service } from "./types";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const SERVICE_KEY = "SERVICES";
export const FAVORITE_KEY = "FAVORITES";

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
    onMutate: ({ serviceId }) => {
      queryClient.setQueryData<Service[]>([SERVICE_KEY], (oldData) => {
        const data = oldData ?? [];
        const updatedData = data.map((service) => {
          const serviceWithFavorite = service as Service & {
            isFavorite?: boolean;
          };
          return serviceWithFavorite._id === serviceId
            ? {
                ...serviceWithFavorite,
                isFavorite: !serviceWithFavorite.isFavorite,
              }
            : serviceWithFavorite;
        });
        return updatedData;
      });
    },
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
    queryKey: [SERVICE_KEY, email, FAVORITE_KEY],
    queryFn: () => fetchFavoriteServices(email),
    enabled: !!email,
  });
};

export const useServiceData = () => {
  const { data: allServices } = useServices();
  const { user } = useContext(UserContext);
  const { data: favoriteServices } = useFavoriteServices(user?.email || "");

  return {
    allServices,
    user,
    favoriteServices,
  };
};
