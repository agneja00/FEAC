import styles from "./Avatar.module.scss";
import ResponsiveImage from "./ResponsiveImage";
import { useTranslation } from "react-i18next";

interface AvatarProps {
  children: React.ReactNode;
  src?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  children,
  src,
  onClick,
  className,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${styles.avatar} ${className || ""}`.trim()}
      onClick={onClick}
    >
      {src ? (
        <ResponsiveImage
          src={src}
          alt={t("alt.userPhoto")}
          className={styles.avatarImage}
          avatar
        />
      ) : (
        children
      )}
    </div>
  );
};

export default Avatar;
