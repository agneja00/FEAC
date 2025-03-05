import * as Yup from "yup";
import { LoginRequest, RegisterRequest } from "./types";
import { errorMessage } from "@/constants/errorMessage";

export const loginValidationSchema = (lang: "en" | "lt" | "ru"): Yup.Schema<LoginRequest> => Yup.object().shape({
  email: Yup.string()
    .email(errorMessage[lang]?.errorMessage?.email)
    .required(errorMessage[lang]?.errorMessage?.required),
  password: Yup.string().required(errorMessage[lang]?.errorMessage?.required),
});

export const registerValidationSchema = (lang: "en" | "lt" | "ru"): Yup.Schema<RegisterRequest> => Yup.object().shape({
  name: Yup.string().required(errorMessage[lang]?.errorMessage?.required),
  email: Yup.string()
    .email(errorMessage[lang]?.errorMessage?.email)
    .required(errorMessage[lang]?.errorMessage?.required),
  password: Yup.string().required(errorMessage[lang]?.errorMessage?.required),
});

export const loginInitialValues: LoginRequest = {
  email: "",
  password: "",
};

export const registerInitialValues: RegisterRequest = {
  name: "",
  email: "",
  password: "",
};
