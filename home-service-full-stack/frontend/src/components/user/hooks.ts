import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, registerUser } from "./api";
import { useTranslation } from "react-i18next";
import { LoginRequest, RegisterRequest } from "./types";
import axiosInstance from "@/config/axios";
import { useParams } from "react-router-dom";

export const USERS_KEY = "USERS";

export const useLoginUser = () => {
  const { lang } = useParams<{ lang: string }>();
  return useMutation({
    mutationFn: (formValues: LoginRequest) =>
      axiosInstance.post(`/${lang}/auth/login`, formValues),
  });
};

export const useRegisterUser = () => {
  const { lang } = useParams<{ lang: string }>();
  return useMutation({
    mutationFn: (formValues: RegisterRequest) =>
      axiosInstance.post(`/${lang}/auth/register`, formValues),
  });
};
