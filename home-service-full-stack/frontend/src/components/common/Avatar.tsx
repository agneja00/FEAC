import styles from "./Avatar.module.scss";

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
        <img src={src} alt="User avatar" className={styles.avatarImage} />
      ) : (
        children
      )}
    </div>
  );
};

export default Avatar;
