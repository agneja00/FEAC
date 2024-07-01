import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import classNames from "classnames";

const Button = ({ className, rounded, favorite, small, large, ...props }) => {
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
    />
  );
};

Button.propTypes = {
  className: PropTypes.string,
  rounded: PropTypes.bool,
  favorite: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
};

export default Button;
