import styles from "./ProfileCard.module.scss";
import { NavLink, generatePath, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Avatar from "../Avatar/Avatar";
import type { IUser } from "@/components/user/types";
import { ROUTES } from "@/constants/routes";

interface ProfileCardProps {
  user: IUser;
  onClick?: () => void;
  title?: string;
  className?: string;
}

const ProfileCard = ({ user, onClick, title, className }: ProfileCardProps) => {
  const { t } = useTranslation();
  const { lang = "en" } = useParams<{ lang?: string }>();

  const avatarUrl = user.photo?.startsWith("http") ? user.photo : undefined;

  return (
    <NavLink
      to={generatePath(ROUTES.ACCOUNT, {
        lang,
        email: user.email,
      })}
      onClick={onClick}
      className={`${styles.card} ${className ?? ""}`}
    >
      <Avatar src={avatarUrl} name={user.name ?? user.email} />

      <div className={styles.info}>
        <p className={styles.title}>{title ?? t("accountModal.myAccount")}</p>

        <p className={styles.email}>{user.email}</p>
      </div>
    </NavLink>
  );
};

export default ProfileCard;
