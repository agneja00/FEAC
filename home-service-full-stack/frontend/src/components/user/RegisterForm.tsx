import styles from "./Form.module.scss";
import { Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import Button from "../common/Button";
import { ROUTES } from "@/constants/routes";
import { generatePath, Link, useNavigate, useParams } from "react-router-dom";
import FormikField from "../common/FormikInput";
import {
  registerInitialValues,
  registerValidationSchema,
} from "../user/consts";
import { useRegisterUser } from "./hooks";
import { IRegisterRequest } from "../user/types";
import { ErrorResponse } from "../types/error";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const { t } = useTranslation();
  const { lang = "en" } = useParams<{ lang: string }>();
  const validatedLang =
    lang === "en" || lang === "lt" || lang === "ru" ? lang : "en";
  const { mutateAsync: registerUser } = useRegisterUser();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (formValues: IRegisterRequest) => {
    try {
      await registerUser(formValues);
      navigate(generatePath(ROUTES.LOGIN, { lang }));
      enqueueSnackbar(t("messages.registrationSuccess"), {
        variant: "success",
      });
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      enqueueSnackbar(errorMessage?.response?.data.message ?? "", {
        variant: "error",
      });
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={registerInitialValues}
        validationSchema={registerValidationSchema(validatedLang)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <h1 className={styles.title}>{t("common.register")}</h1>
            <div className={styles.field}>
              <FormikField
                name="name"
                placeholder={t("inputPlaceholder.name")}
              />
            </div>
            <div className={styles.field}>
              <FormikField
                name="email"
                type="email"
                placeholder={t("common.email")}
              />
            </div>
            <div className={styles.field}>
              <FormikField
                name="password"
                type="password"
                placeholder={t("common.password")}
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {t("common.register")}
            </Button>
            <div className={styles.link}>
              <Link
                to={generatePath(ROUTES.LOGIN, { lang })}
                className={styles.signUp}
              >
                {t("forms.loginAndRegister.login")}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
