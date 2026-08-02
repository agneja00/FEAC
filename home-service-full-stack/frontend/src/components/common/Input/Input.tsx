import styles from "./Input.module.scss";
import classNames from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  search?: boolean;
}

const Input = ({ className, search, ...props }: InputProps) => {
  return (
    <input
      className={classNames(styles.input, search && styles.search, className)}
      {...props}
    />
  );
};

export default Input;
