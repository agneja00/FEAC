import PropTypes from "prop-types";
import styles from "./Avatar.module.scss";

const Avatar = ({ children }) => {
  return <div className={styles.avatar}>{children}</div>;
};

Avatar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Avatar;
