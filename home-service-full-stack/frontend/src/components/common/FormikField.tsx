import classNames from "classnames";
import styles from "./Input.module.scss";
import { ErrorMessage, useField } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormikFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  preview?: string | null;
}

const FormikField = ({
  name,
  label,
  type,
  preview,
  ...props
}: FormikFieldProps) => {
  const [field, meta, helpers] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

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
          onChange={(e) => {
            if (e.currentTarget.files && e.currentTarget.files[0]) {
              helpers.setValue(e.currentTarget.files[0]);
            }
          }}
        />
        <ErrorMessage name={name} component="div" className={styles.error} />
      </div>
    );
  }

  const isPassword = type === "password";

  return (
    <div className={styles.formField}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          {...field}
          id={name}
          type={isPassword && !showPassword ? "password" : "text"}
          className={styles.input}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles.eyeButton}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}
      </div>
      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
};

export default FormikField;
