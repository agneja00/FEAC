import React from "react";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ children, onClick }) => {
  return (
    <div className={styles.avatar} onClick={onClick}>
      {children}
    </div>
  );
};

export default Avatar;
