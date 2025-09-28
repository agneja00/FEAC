import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchServiceById,
  fetchServices,
  toggleFavorite,
  fetchFavoriteServices,
} from "./api";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { IService, ServiceWithFavorite } from "./types";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ROUTES } from "@/constants/routes";

export const SERVICE_KEY = "SERVICES";
export const FAVORITE_KEY = "FAVORITES";

export const useServices = (lang: string) =>
  useQuery<ServiceWithFavorite[]>({
    queryKey: [SERVICE_KEY, lang],
    queryFn: () => fetchServices(lang),
  });

export const useServiceById = (serviceId?: string, lang: string = "en") =>
  useQuery<ServiceWithFavorite>({
    queryKey: [SERVICE_KEY, serviceId, lang],
    queryFn: () => fetchServiceById(lang, serviceId!),
    enabled: !!serviceId,
  });

export const useServicePath = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang?: string }>();

  return (id: string) => {
    if (!lang) return;
    navigate(generatePath(ROUTES.SERVICE_ID, { lang, id }));
  };
};

export const useCurrentService = () => {
  const { id, lang } = useParams<{ id?: string; lang?: string }>();
  const { data } = useServiceById(id, lang || "en");

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
      await queryClient.cancelQueries({ queryKey: [FAVORITE_KEY] });

      const previousServices = queryClient.getQueryData<ServiceWithFavorite[]>([
        SERVICE_KEY,
      ]);
      const previousFavorites = queryClient.getQueryData<ServiceWithFavorite[]>(
        [FAVORITE_KEY],
      );

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

      if (previousFavorites) {
        queryClient.setQueryData(
          [FAVORITE_KEY],
          previousFavorites.filter((service) => service._id !== serviceId),
        );
      }

      return { previousServices, previousFavorites };
    },
    onError: (_err, _newService, context) => {
      if (context?.previousServices) {
        queryClient.setQueryData([SERVICE_KEY], context.previousServices);
      }
      if (context?.previousFavorites) {
        queryClient.setQueryData([FAVORITE_KEY], context.previousFavorites);
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

export const useFavoriteServices = (email?: string) => {
  const { lang } = useParams<{ lang?: string }>();

  return useQuery<ServiceWithFavorite[]>({
    queryKey: [FAVORITE_KEY, email, lang],
    queryFn: () => fetchFavoriteServices(lang || "en", email!),
    enabled: !!email,
  });
};

export const useServiceData = () => {
  const { lang } = useParams<{ lang?: string }>();
  const selectedLang = lang || "en";

  const {
    data: allServices = [],
    isLoading: isServicesLoading,
    error: servicesError,
  } = useServices(selectedLang);

  const { user } = useContext(UserContext);

  const {
    data: favoriteServices = [],
    isLoading: isFavoritesLoading,
    error: favoritesError,
  } = useFavoriteServices(user?.email);

  const translateService = (service: IService) => ({
    ...service,
    isFavorite: favoriteServices.some((fav) => fav._id === service._id),
    name: service.translations?.name?.[selectedLang] || service.name,
    category:
      service.translations?.category?.[selectedLang] || service.category,
  });

  return {
    allServices: allServices.map(translateService),
    favoriteServices: favoriteServices.map(translateService),
    user,
    isLoading: isServicesLoading || isFavoritesLoading,
    error: servicesError || favoritesError,
  };
};
