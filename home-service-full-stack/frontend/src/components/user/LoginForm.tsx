import styles from "./Form.module.scss";
import { useContext, useState } from "react";
import { Form, Formik } from "formik";
import { loginInitialValues, loginValidationSchema } from "../user/consts";
import { LoginRequest } from "../user/types";
import FormikField from "../common/FormikInput";
import Button from "../common/Button";
import { ROUTES } from "../../constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useLoginUser } from "./hooks";
import { ErrorResponse } from "../types/error";

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const [error, setError] = useState<string>("");
  const { mutateAsync: loginUser } = useLoginUser();
  const navigate = useNavigate();

  const handleSubmit = async (formValues: LoginRequest) => {
    try {
      const response = await loginUser(formValues);
      login(response);
      navigate(ROUTES.HOME);
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      setError(errorMessage.response?.data.message ?? "");
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <h1 className={styles.title}>Login</h1>
          <div className={styles.field}>
            <FormikField name="email" type="email" placeholder="Email" />
          </div>
          <div className={styles.field}>
            <FormikField
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit">Log in</Button>
          <div className={styles.link}>
            <Link to={ROUTES.REGISTER} className={styles.signUp}>
              Don't have an account? Sign up
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
