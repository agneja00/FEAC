import styles from "./Avatar.module.scss";
import ResponsiveImage from "@/components/common/ResponsiveImage";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

interface AvatarProps {
  src?: string;
  name?: string;
  small?: boolean;
  large?: boolean;
  className?: string;
  onClick?: () => void;
}

const Avatar = ({ src, name, small, className, onClick }: AvatarProps) => {
  const { t } = useTranslation();

  const initials = name?.trim().charAt(0).toUpperCase() ?? "?";

  return (
    <div
      className={classNames(styles.avatar, small && styles.small, className)}
      onClick={onClick}
    >
      {src ? (
        <ResponsiveImage
          src={src}
          alt={t("alt.userPhoto")}
          className={styles.image}
          avatar
        />
      ) : (
        initials
      )}
    </div>
  );
};

export default Avatar;
