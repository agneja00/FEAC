import classNames from "classnames";
import styles from "./UrlIcon.module.scss";
import PropTypes from "prop-types";

const UrlIcon = ({ className, src, alt }) => {
  return (
    <img className={classNames(styles.icon, className)} src={src} alt={alt} />
  );
};

UrlIcon.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default UrlIcon;
