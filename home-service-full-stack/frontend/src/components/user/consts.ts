import * as Yup from "yup";
import { ILoginRequest, IRegisterRequest } from "./types";
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

export const loginInitialValues: ILoginRequest = {
  email: "",
  password: "",
};

export const registerInitialValues: IRegisterRequest = {
  name: "",
  email: "",
  password: "",
};
