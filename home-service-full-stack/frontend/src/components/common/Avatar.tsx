import styles from "./Avatar.module.scss";
import ResponsiveImage from "./ResponsiveImage";

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
  return (
    <div
      className={`${styles.avatar} ${className || ""}`.trim()}
      onClick={onClick}
    >
      {src ? (
        <ResponsiveImage
          src={src}
          alt="User avatar"
          className={styles.avatarImage}
        />
      ) : (
        children
      )}
    </div>
  );
};

export default Avatar;
