import * as Yup from "yup";
import { NewService } from "./types";
import { errorMessage } from "@/constants/errorMessage";

const categoryTranslations: Record<"en" | "lt", Record<string, string>> = {
  en: {
    Shifting: "Shifting",
    Repair: "Repair",
    Plumbing: "Plumbing",
    Cleaning: "Cleaning",
    Painting: "Painting",
    Electric: "Electric",
    Decoration: "Decoration",
  },
  lt: {
    Shifting: "Perkraustymas",
    Repair: "Remontas",
    Plumbing: "Santechnika",
    Cleaning: "Valymas",
    Painting: "Dažymas",
    Electric: "Elektra",
    Decoration: "Dekoravimas",
  },
};

const allValidCategories = [
  ...Object.values(categoryTranslations.en),
  ...Object.values(categoryTranslations.lt),
];

export const ServiceRegisterValidationSchema: Yup.Schema<NewService> =
  Yup.object().shape({
    name: Yup.string().required(errorMessage.required),
    about: Yup.string().required(errorMessage.required),
    address: Yup.string().required(errorMessage.required),
    category: Yup.string()
      .required(errorMessage.select)
      .oneOf(allValidCategories, "Invalid category"),
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
