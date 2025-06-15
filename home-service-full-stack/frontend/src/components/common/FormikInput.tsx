import classNames from "classnames";
import styles from "./Input.module.scss";
import { Field, ErrorMessage, useField } from "formik";

interface FormikFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview?: string | null;
}

const FormikField = ({
  name,
  label,
  type,
  onChange,
  preview,
  ...props
}: FormikFieldProps) => {
  const [field] = useField(name);

  if (type === "file") {
    return (
      <div className={styles.formField}>
        {label && (
          <label
            htmlFor={name}
            className={classNames(styles.label, styles.fileLabel)}
          >
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={onChange}
        />
        <ErrorMessage name={name} component="div" className={styles.error} />
      </div>
    );
  }

  return (
    <div className={styles.formField}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <Field
        name={name}
        as="input"
        id={name}
        type={type}
        className={styles.input}
        {...props}
      />
      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
};

export default FormikField;
