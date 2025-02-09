import styles from "../user/Form.module.scss";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useSnackbar } from "notistack";
import FormikField from "../common/FormikInput";
import {
  ServiceRegisterValidationSchema,
  serviceRegisterInitialValues,
} from "./consts";
import Button from "../common/Button";
import { NewService } from "./types";
import { sendServiceEmail } from "./api";

interface ServiceRegisterFormProps {
  onSubmitSuccess?: () => void;
}

const ServiceRegisterForm: React.FC<ServiceRegisterFormProps> = ({
  onSubmitSuccess,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (
    formValues: NewService,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      await sendServiceEmail(formValues);
      enqueueSnackbar("Email sent successfully!", { variant: "success" });
      resetForm();

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : "An error occurred.",
        { variant: "error" },
      );
    }
  };

  return (
    <Formik
      initialValues={serviceRegisterInitialValues}
      validationSchema={ServiceRegisterValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <h2 className={styles.subtitle}>
          Let’s Work Together to Serve More Homes!
        </h2>
        <FormikField label="Service name:" name="name" />
        <div className={styles.aboutContainer}>
          <label className={styles.label} htmlFor="about">
            Description of your service:
          </label>
          <Field as="textarea" name="about" className={styles.textarea} />
          <ErrorMessage name="about" component="div" className={styles.error} />
        </div>
        <FormikField label="Company address:" name="address" />
        <div className={styles.selectContainer}>
          <label className={styles.label} htmlFor="category">
            Category:
          </label>
          <Field as="select" name="category" className={styles.select}>
            <option value="">Select a category:</option>
            {[
              "shifting",
              "repair",
              "plumbing",
              "cleaning",
              "painting",
              "electric",
              "decoration",
            ].map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="category"
            component="div"
            className={styles.error}
          />
        </div>
        <FormikField label="Contact person:" name="contactPerson" />
        <FormikField type="email" label="Email:" name="email" />
        <Button type="submit">Complete the Form</Button>
      </Form>
    </Formik>
  );
};

export default ServiceRegisterForm;
