import styles from "./Form.module.scss";
import { useContext, useState } from "react";
import { Form, Formik } from "formik";
import { loginInitialValues, loginValidationSchema } from "../user/consts";
import { LoginRequest } from "../user/types";
import FormikField from "../common/FormikInput";
import Button from "../common/Button";
import { ROUTES } from "../../constants/routes";
import { generatePath, Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useLoginUser } from "./hooks";
import { ErrorResponse } from "../types/error";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { t } = useTranslation();
  const { lang = "en" } = useParams<{ lang: string }>();
  const validatedLang =
    lang === "en" || lang === "lt" || lang === "ru" ? lang : "en";
  const { login } = useContext(UserContext);
  const [error, setError] = useState("");
  const { mutateAsync: loginUser } = useLoginUser();
  const navigate = useNavigate();

  const handleSubmit = async (formValues: LoginRequest) => {
    try {
      const response = await loginUser(formValues);
      login(response.data);
      navigate(generatePath(ROUTES.HOME, { lang }));
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      setError(errorMessage.response?.data.message ?? "");
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginValidationSchema(validatedLang)}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <h1 className={styles.title}>
            {t("forms.loginAndRegister.loginTitle")}
          </h1>
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
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit">{t("buttons.login")}</Button>
          <div className={styles.link}>
            <Link
              to={generatePath(ROUTES.REGISTER, { lang })}
              className={styles.signUp}
            >
              {t("forms.loginAndRegister.sign")}
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
