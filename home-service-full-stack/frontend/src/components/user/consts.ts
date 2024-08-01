import * as Yup from "yup";
import { LoginRequest, RegisterRequest } from "./types";
import { errorMessage } from "@/constants/errorMessage";

export const loginValidationSchema: Yup.Schema<LoginRequest> =
  Yup.object().shape({
    email: Yup.string()
      .email(errorMessage.email)
      .required(errorMessage.required),
    password: Yup.string().required(errorMessage.required),
  });

export const reigsterValidationSchema: Yup.Schema<RegisterRequest> =
  Yup.object().shape({
    name: Yup.string().required(errorMessage.required),
    email: Yup.string()
      .email(errorMessage.email)
      .required(errorMessage.required),
    password: Yup.string().required(errorMessage.required),
  });

export const loginInitialValues: LoginRequest = {
  email: "",
  password: "",
};

export const registerInitialValus: RegisterRequest = {
  name: "",
  email: "",
  password: "",
};
