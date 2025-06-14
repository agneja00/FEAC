import * as Yup from "yup";
import { ILoginRequest, IRegisterRequest, IUpdateUserRequest } from "./types";
import { errorMessage } from "@/constants/errorMessage";

export const loginValidationSchema = (
  lang: "en" | "lt" | "ru",
): Yup.Schema<ILoginRequest> =>
  Yup.object().shape({
    email: Yup.string()
      .email(errorMessage[lang]?.errorMessage?.email)
      .required(errorMessage[lang]?.errorMessage?.required),
    password: Yup.string().required(errorMessage[lang]?.errorMessage?.required),
  });

export const registerValidationSchema = (
  lang: "en" | "lt" | "ru",
): Yup.Schema<IRegisterRequest> =>
  Yup.object().shape({
    name: Yup.string().required(errorMessage[lang]?.errorMessage?.required),
    email: Yup.string()
      .email(errorMessage[lang]?.errorMessage?.email)
      .required(errorMessage[lang]?.errorMessage?.required),
    password: Yup.string().required(errorMessage[lang]?.errorMessage?.required),
  });

export const updateUserValidationSchema = (
  lang: "en" | "lt" | "ru",
): Yup.Schema<IUpdateUserRequest> =>
  Yup.object().shape({
    name: Yup.string().required(errorMessage[lang]?.errorMessage?.required),
    surname: Yup.string().optional(),
    age: Yup.number()
      .min(0, errorMessage[lang]?.errorMessage?.invalidAge)
      .optional(),
    country: Yup.string().optional(),
    city: Yup.string().optional(),
    email: Yup.string()
      .email(errorMessage[lang]?.errorMessage?.email)
      .required(errorMessage[lang]?.errorMessage?.required),
    password: Yup.string().optional(),
  });

export const loginInitialValues: ILoginRequest = {
  email: "",
  password: "",
};

export const registerInitialValues: IRegisterRequest = {
  name: "",
  email: "",
  password: "",
};

export const updateUserInitialValues: IUpdateUserRequest = {
  name: "",
  surname: "",
  age: undefined,
  country: "",
  city: "",
  email: "",
  password: "",
};
