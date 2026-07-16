import styles from "./Button.module.scss";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  favorite?: boolean;
  small?: boolean;
  large?: boolean;
  cancel?: boolean;
  active?: boolean;
  update?: boolean;
  outline?: boolean;
  brand?: boolean;
  search?: boolean;
}

const Button = ({
  className,
  favorite,
  small,
  large,
  cancel,
  active,
  update,
  outline,
  brand,
  search,
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
        active && styles.active,
        update && styles.update,
        outline && styles.outline,
        brand && styles.brand,
        search && styles.search,
        className,
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
