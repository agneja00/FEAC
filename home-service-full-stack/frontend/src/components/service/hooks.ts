import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchServiceById, fetchServices, sendServiceEmail } from "./api";
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

const useCurrentService = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useServiceById(id!);

  return { currentService: data };
};

export default useCurrentService;
