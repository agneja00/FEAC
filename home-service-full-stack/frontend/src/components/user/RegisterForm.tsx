import styles from "./Form.module.scss";
import { Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import Button from "../common/Button";
import { ROUTES } from "@/constants/routes";
import { Link, useNavigate } from "react-router-dom";
import FormikField from "../common/FormikInput";
import { registerInitialValus, reigsterValidationSchema } from "../user/consts";
import { useRegisterUser } from "./hooks";
import { RegisterRequest } from "../user/types";
import { ErrorResponse } from "../types/error";

const RegisterForm = () => {
  const { mutateAsync: registerUser } = useRegisterUser();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (formValues: RegisterRequest) => {
    try {
      await registerUser(formValues);
      navigate(ROUTES.LOGIN);
      enqueueSnackbar("Registration successful", {
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
        initialValues={registerInitialValus}
        validationSchema={reigsterValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <h1 className={styles.title}>Register</h1>
            <div className={styles.field}>
              <FormikField name="name" placeholder="Name" />
            </div>
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
            <Button type="submit" disabled={isSubmitting}>
              Register
            </Button>
            <div className={styles.link}>
              <Link to={ROUTES.LOGIN} className={styles.signUp}>
                Already have an account? Log in
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
