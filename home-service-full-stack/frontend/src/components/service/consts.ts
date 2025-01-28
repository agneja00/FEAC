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
          "shifting",
          "repair",
          "plumbing",
          "cleaning",
          "painting",
          "electric",
          "decoration",
        ],
        "Invalid category",
      ),
    contactPerson: Yup.string().required(errorMessage.required),
    email: Yup.string()
      .email(errorMessage.email)
      .required(errorMessage.required),
  });

export const serviceRegisterInitialValues: NewService = {
  name: "",
  about: "",
  address: "",
  category: "",
  contactPerson: "",
  email: "",
};
