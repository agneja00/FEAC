import styles from "./Input.module.scss";
import { Field, ErrorMessage } from "formik";
import Input from "./Input";

interface FormikFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const FormikField = ({ name, label, ...props }: FormikFieldProps) => {
  return (
    <div className={styles.formField}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <Field name={name} as={Input} id={name} {...props} />
      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
};

export default FormikField;
