import styles from "./UpdateAccountForm.module.scss";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { useUpdateUser, useUser } from "./hooks";
import { updateUserValidationSchema } from "./consts";
import { IUpdateUserRequest, IUser } from "./types";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import FormikField from "../common/FormikField";
import Button from "../common/Button";
import { ErrorResponse } from "../types/error";
import { useState, ChangeEvent, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

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
  const { setUser } = useContext(UserContext);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  if (isLoading || !userData) return null;

  const initialValues: IUpdateUserRequest = {
    name: userData.name,
    surname: userData.surname ?? "",
    age: userData.age ?? 0,
    country: userData.country ?? "",
    city: userData.city ?? "",
    email: userData.email,
    password: "",
    passwordRepeat: "",
    photo: undefined,
  };

  const handlePhotoChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFieldValue("photo", file);
  };

  const handleSubmit = async (values: IUpdateUserRequest, actions: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name ?? "");
      formData.append("surname", values.surname ?? "");
      formData.append("age", String(values.age ?? ""));
      formData.append("country", values.country ?? "");
      formData.append("city", values.city ?? "");
      formData.append("email", values.email ?? "");
      if (values.password) formData.append("password", values.password);
      if (values.photo) formData.append("photo", values.photo);

      const updatedUser: IUser = await updateUser(formData);

      enqueueSnackbar(t("messages.updateSuccess"), { variant: "success" });
      setUser(updatedUser);

      actions.resetForm({
        values: {
          ...values,
          password: "",
          passwordRepeat: "",
          photo: null,
        },
      });

      setPhotoPreview(
        updatedUser.photo ? `${updatedUser.photo}?t=${Date.now()}` : null,
      );

      onSuccess?.();
    } catch (err) {
      const e = err as ErrorResponse;
      enqueueSnackbar(e?.response?.data?.message ?? t("messages.updateError"), {
        variant: "error",
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={updateUserValidationSchema(validatedLang)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => {
        useEffect(() => {
          if (values.photo) {
            const objectUrl = URL.createObjectURL(values.photo);
            setPhotoPreview(objectUrl);

            return () => {
              URL.revokeObjectURL(objectUrl);
            };
          } else if (userData?.photo) {
            setPhotoPreview(userData.photo);
          } else {
            setPhotoPreview(null);
          }
        }, [values.photo, userData?.photo]);

        return (
          <Form className={styles.form}>
            <FormikField
              name="name"
              label={`${t("inputPlaceholder.name")}:`}
              required
            />
            <FormikField
              name="surname"
              label={`${t("forms.updateAccount.surname")}:`}
            />
            <FormikField
              name="age"
              type="number"
              label={`${t("forms.updateAccount.age")}:`}
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
              type="email"
              label={`${t("common.email")}:`}
              required
            />
            <FormikField
              name="password"
              type="password"
              label={`${t("forms.loginAndRegister.passwordNew")}:`}
            />
            <FormikField
              name="passwordRepeat"
              type="password"
              label={`${t("forms.loginAndRegister.passwordRepeat")}:`}
              required
            />
            <FormikField
              name="photo"
              type="file"
              label={`${t("forms.updateAccount.photo")}:`}
              onChange={(e) => handlePhotoChange(e, setFieldValue)}
            />

            {photoPreview && (
              <div className={styles.previewWrapper}>
                <img
                  src={photoPreview}
                  alt="Preview"
                  className={styles.avatarPreview}
                />
              </div>
            )}

            <Button type="submit" update disabled={isSubmitting}>
              {t("buttons.update")}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateAccountForm;
