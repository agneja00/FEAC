import styles from "./UrlIcon.module.scss";
import classNames from "classnames";

interface UrlIconProps {
  className?: string;
  src: string;
  alt: string;
}

const UrlIcon: React.FC<UrlIconProps> = ({ className, src, alt }) => {
  return (
    <img className={classNames(styles.icon, className)} src={src} alt={alt} />
  );
};

export default UrlIcon;
