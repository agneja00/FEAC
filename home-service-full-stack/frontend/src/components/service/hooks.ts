import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchServiceById,
  fetchServices,
  toggleFavorite,
  fetchFavoriteServices,
} from "./api";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { ServiceWithFavorite } from "./types";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ROUTES } from "@/constants/routes";

export const SERVICE_KEY = "SERVICES";
export const FAVORITE_KEY = "FAVORITES";

export const useServices = (lang: string) => {
  return useQuery<ServiceWithFavorite[]>({
    queryKey: [SERVICE_KEY, lang],
    queryFn: () => fetchServices(lang),
  });
};

export const useServiceById = (serviceId: string, lang: string) => {
  return useQuery<ServiceWithFavorite>({
    queryKey: [SERVICE_KEY, serviceId, lang],
    queryFn: () => fetchServiceById(lang, serviceId),
  });
};

export const useServicePath = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const navigateToService = (id: string) => {
    const servicePath = generatePath(ROUTES.SERVICE_ID, { lang, id });
    navigate(servicePath);
  };

  return navigateToService;
};

export const useCurrentService = () => {
  const { id, lang } = useParams<{ id: string; lang: string }>();
  const { data } = useServiceById(id!, lang || "en");
  return { currentService: data };
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      email,
      serviceId,
      lang,
    }: {
      email: string;
      serviceId: string;
      lang: string;
    }) => toggleFavorite(lang, email, serviceId),
    onMutate: async ({ serviceId }) => {
      await queryClient.cancelQueries({ queryKey: [SERVICE_KEY] });
      const previousServices = queryClient.getQueryData<ServiceWithFavorite[]>([
        SERVICE_KEY,
      ]);
      if (previousServices) {
        queryClient.setQueryData(
          [SERVICE_KEY],
          previousServices.map((service) =>
            service._id === serviceId
              ? { ...service, isFavorite: !service.isFavorite }
              : service,
          ),
        );
      }
      return { previousServices };
    },
    onError: (_err, _newService, context) => {
      if (context?.previousServices) {
        queryClient.setQueryData([SERVICE_KEY], context.previousServices);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [SERVICE_KEY] });
      queryClient.invalidateQueries({
        queryKey: [FAVORITE_KEY, variables.email],
      });
    },
  });
};

export const useFavoriteServices = (email: string) => {
  const { lang = "en" } = useParams<{ lang: string }>();
  return useQuery<ServiceWithFavorite[]>({
    queryKey: [FAVORITE_KEY, email, lang],
    queryFn: () => fetchFavoriteServices(lang, email),
    enabled: !!email,
  });
};

export const useServiceData = () => {
  const { lang } = useParams<{ lang: string }>();
  const { data: allServices = [] } = useServices(lang || "en");
  const { user } = useContext(UserContext);
  const { data: favoriteServices = [] } = useFavoriteServices(
    user?.email || "",
  );

  const favoriteServiceIds = new Set(
    favoriteServices.map((service) => service._id),
  );

  const updatedServices = allServices.map((service) => ({
    ...service,
    isFavorite: favoriteServiceIds.has(service._id),
  }));

  return {
    allServices: updatedServices,
    user,
    favoriteServices,
  };
};
