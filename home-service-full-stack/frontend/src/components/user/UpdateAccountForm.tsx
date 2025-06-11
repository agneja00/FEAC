import styles from "./UpdateAccountForm.module.scss";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { useUpdateUser, useUser } from "./hooks";
import { updateUserValidationSchema, updateUserInitialValues } from "./consts";
import { IUpdateUserRequest } from "./types";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import FormikField from "../common/FormikInput";
import Button from "../common/Button";
import { ErrorResponse } from "../types/error";

interface UpdateAccountFormProps {
  userEmail: string;
  onSuccess?: () => void;
}

const UpdateAccountForm: React.FC<UpdateAccountFormProps> = ({
  userEmail,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const { lang = "en" } = useParams<{ lang: string }>();

  const validatedLang: "en" | "lt" | "ru" =
    lang === "en" || lang === "lt" || lang === "ru" ? lang : "en";

  const { data: userData, isLoading } = useUser(userEmail, validatedLang);
  const { mutateAsync: updateUser } = useUpdateUser(userEmail);
  const { enqueueSnackbar } = useSnackbar();

  if (isLoading || !userData) return null;

  const initialValues: IUpdateUserRequest = {
    name: userData.name || "",
    surname: userData.surname || "",
    age: userData.age ?? 0,
    country: userData.country || "",
    city: userData.city || "",
    email: userData.email || "",
    password: "",
  };

  const handleSubmit = async (formValues: IUpdateUserRequest) => {
    try {
      await updateUser(formValues);
      enqueueSnackbar(t("messages.updateSuccess"), { variant: "success" });
      onSuccess?.();
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      enqueueSnackbar(
        errorMessage?.response?.data?.message ?? t("messages.updateError"),
        { variant: "error" }
      );
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={updateUserValidationSchema(validatedLang)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <FormikField name="name" label={`${t("inputPlaceholder.name")}:`} />
          <FormikField
            name="surname"
            label={`${t("forms.updateAccount.surname")}:`}
          />
          <FormikField
            name="age"
            label={`${t("forms.updateAccount.age")}:`}
            type="number"
          />
          <FormikField
            name="country"
            label={`${t("forms.updateAccount.country")}:`}
          />
          <FormikField
            name="city"
            label={`${t("forms.updateAccount.city")}:`}
          />
          <FormikField
            name="email"
            label={`${t("common.email")}:`}
            type="email"
          />
          <FormikField
            name="password"
            label={`${t("common.password")}:`}
            type="password"
          />
          <Button type="submit" update disabled={isSubmitting}>
            {t("buttons.update")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateAccountForm;
