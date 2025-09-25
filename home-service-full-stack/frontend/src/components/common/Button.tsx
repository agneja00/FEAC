import styles from "./Button.module.scss";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  favorite?: boolean;
  small?: boolean;
  large?: boolean;
  cancel?: boolean;
  language?: boolean;
  active?: boolean;
  update?: boolean;
}

const Button = ({
  className,
  favorite,
  small,
  large,
  cancel,
  language,
  active,
  update,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        favorite && styles.favorite,
        small && styles.small,
        large && styles.large,
        cancel && styles.cancel,
        language && styles.language,
        active && styles.active,
        update && styles.update,
        className,
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
