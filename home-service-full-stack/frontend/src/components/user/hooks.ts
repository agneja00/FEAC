import { useMutation } from "@tanstack/react-query";
import { ILoginRequest, IRegisterRequest } from "./types";
import axiosInstance from "@/config/axios";
import { useParams } from "react-router-dom";

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
