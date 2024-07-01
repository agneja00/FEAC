import PropTypes from "prop-types";
import styles from "./Input.module.scss";

const Input = ({ placeholder, type, onChange, value, error }) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "password", "email", "number", "submit"])
    .isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default Input;
