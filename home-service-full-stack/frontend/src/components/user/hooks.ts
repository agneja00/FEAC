import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ILoginRequest, IRegisterRequest, IUpdateUserRequest } from "./types";
import axiosInstance from "@/config/axios";
import { useParams } from "react-router-dom";
import { getUserByEmail } from "./api";

export const USERS_KEY = "USERS";

export const useLoginUser = () => {
  const { lang } = useParams<{ lang: string }>();
  return useMutation({
    mutationFn: (formValues: ILoginRequest) =>
      axiosInstance.post(`/${lang}/auth/login`, formValues),
  });
};

export const useRegisterUser = () => {
  const { lang } = useParams<{ lang: string }>();
  return useMutation({
    mutationFn: (formValues: IRegisterRequest) =>
      axiosInstance.post(`/${lang}/auth/register`, formValues),
  });
};

export const useUpdateUser = (email: string) => {
  const { lang = "en" } = useParams<{ lang: string }>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateUserRequest) =>
      axiosInstance.put(`/${lang}/user/${email}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", email] });
    },
  });
};

export const useUser = (email: string, lang = "en") => {
  return useQuery({
    queryKey: ["user", email],
    queryFn: () => getUserByEmail(email, lang),
    enabled: !!email,
  });
};
