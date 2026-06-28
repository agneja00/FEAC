import styles from "./UserSection.module.scss";
import { useNavigate, generatePath, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../../common/Button";
import LanguageSwitcher from "../../../common/LanguageSwitcher";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import { ROUTES } from "@/constants/routes";
import type { IUser } from "../../../user/types";

interface UserSectionProps {
  user: IUser | null;
  className?: string;
}

const UserSection = ({ user, className }: UserSectionProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang = "en" } = useParams<{ lang?: string }>();

  return (
    <div className={`${styles.userSection} ${className ?? ""}`}>
      <LanguageSwitcher />

      {user ? (
        <AvatarMenu user={user} />
      ) : (
        <div className={styles.authButtons}>
          <Button
            outline
            onClick={() => navigate(generatePath(ROUTES.LOGIN, { lang }))}
          >
            {t("buttons.login")}
          </Button>
          <Button
            brand
            onClick={() => navigate(generatePath(ROUTES.REGISTER, { lang }))}
          >
            {t("buttons.signUp")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserSection;
