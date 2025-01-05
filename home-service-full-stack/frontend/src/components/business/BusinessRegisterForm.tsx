import styles from "../user/Form.module.scss";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useSnackbar } from "notistack";
import FormikField from "../common/FormikInput";
import {
  BusinessRegisterValidationShema,
  businessRegisterInitialValues,
} from "./consts";
import Button from "../common/Button";
import { NewBusiness } from "./types";

const BusinessRegisterForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (
    formValues: NewBusiness,
    { resetForm }: { resetForm: () => void },
  ) => {
    enqueueSnackbar("Business registered successfully!", {
      variant: "success",
    });
    resetForm();
  };

  return (
    <Formik
      initialValues={businessRegisterInitialValues}
      validationSchema={BusinessRegisterValidationShema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <h2 className={styles.subtitle}>
          Let’s Work Together to Serve More Homes!
        </h2>
        <FormikField label="Business name:" name="name" />
        <FormikField label="Description of your service:" name="about" />
        <FormikField label="Company address:" name="address" />
        <div className={styles.selectContainer}>
          <label className={styles.label} htmlFor="category">
            Category:
          </label>
          <Field as="select" name="category" className={styles.select}>
            <option value="">Select a category:</option>
            <option value="shifting">Shifting</option>
            <option value="repair">Repair</option>
            <option value="plumbing">Plumbing</option>
            <option value="cleaning">Cleaning</option>
            <option value="painting">Painting</option>
            <option value="electric">Electric</option>
            <option value="decoration">Decoration</option>
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

export default BusinessRegisterForm;
