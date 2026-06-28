import styles from "./Topbar.module.scss";
import { Link, generatePath, useParams } from "react-router-dom";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../common/Logo";
import { UserContext } from "../../context/UserContext";
import { ROUTES } from "@/constants/routes";
import DesktopNavigation from "../Topbar/DesktopNavigation/DesktopNavigation";
import UserSection from "../Topbar/UserSection/UserSection";
import MobileMenu from "../Topbar/MobileMenu/MobileMenu";

const Topbar = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const { lang = "en" } = useParams<{ lang?: string }>();

  return (
    <header className={styles.topbar}>
      <Link
        to={generatePath(ROUTES.HOME, { lang })}
        className={styles.logo}
        aria-label={t("alt.logo")}
      >
        <Logo width={220} height={54} role="img" />
      </Link>
      <DesktopNavigation />
      <UserSection user={user} className={styles.desktopUserSection} />
      <MobileMenu user={user} />
    </header>
  );
};

export default Topbar;
