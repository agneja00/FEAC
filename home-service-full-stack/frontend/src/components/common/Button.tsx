import styles from "./Button.module.scss";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: boolean;
  favorite?: boolean;
  small?: boolean;
  large?: boolean;
}

const Button = ({
  className,
  rounded,
  favorite,
  small,
  large,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        rounded && styles.rounded,
        favorite && styles.favorite,
        small && styles.small,
        large && styles.large,
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};
export default Button;
