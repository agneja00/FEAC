import styles from "./Avatar.module.scss";

interface AvatarProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ children, onClick, className }) => {
  return (
    <div
      className={`${styles.avatar} ${className || ""}`.trim()}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Avatar;
