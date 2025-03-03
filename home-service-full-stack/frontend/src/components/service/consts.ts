import * as Yup from "yup";
import { NewService } from "./types";
import { errorMessage } from "@/constants/errorMessage";

export const ServiceRegisterValidationSchema: Yup.Schema<NewService> =
  Yup.object().shape({
    name: Yup.string().required(errorMessage.required),
    about: Yup.string().required(errorMessage.required),
    address: Yup.string().required(errorMessage.required),
    category: Yup.string()
      .required(errorMessage.select)
      .oneOf(
        [
          "Shifting",
          "Repair",
          "Plumbing",
          "Cleaning",
          "Painting",
          "Electric",
          "Decoration",
        ],
        "Invalid category",
      ),
    contactPerson: Yup.string().required(errorMessage.required),
    email: Yup.string()
      .email(errorMessage.email)
      .required(errorMessage.required),
    translations: Yup.object().shape({
      name: Yup.object().shape({
        en: Yup.string().required(errorMessage.required),
        lt: Yup.string().required(errorMessage.required),
      }),
      about: Yup.object().shape({
        en: Yup.string().required(errorMessage.required),
        lt: Yup.string().required(errorMessage.required),
      }),
      category: Yup.object().shape({
        en: Yup.string().required(errorMessage.required),
        lt: Yup.string().required(errorMessage.required),
      }),
    }),
  });

export const serviceRegisterInitialValues: NewService = {
  name: "",
  about: "",
  address: "",
  category: "",
  contactPerson: "",
  email: "",
  translations: {
    name: {
      en: "",
      lt: "",
    },
    about: {
      en: "",
      lt: "",
    },
    category: {
      en: "",
      lt: "",
    },
  },
};
