import styles from "./DesktopNavigation.module.scss";
import { Link, generatePath, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { ROUTES } from "@/constants/routes";

const DesktopNavigation = () => {
  const { t } = useTranslation();
  const { lang = "en" } = useParams<{ lang?: string }>();

  const NAVIGATION_LINKS = useMemo(
    () => [
      {
        href: generatePath(ROUTES.SERVICES, { lang }),
        label: t("topbar.services"),
      },
      {
        href: generatePath(ROUTES.ABOUT_US, { lang }),
        label: t("common.aboutUs"),
      },
      {
        href: generatePath(ROUTES.FOR_BUSINESS_PARTNERS, { lang }),
        label: t("common.forBusinessPartners"),
      },
    ],
    [lang, t],
  );

  return (
    <nav className={styles.nav}>
      {NAVIGATION_LINKS.map(({ href, label }) => (
        <Link key={label} to={href} className={styles.navLink}>
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
