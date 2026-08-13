import styles from "./MobileMenu.module.scss";
import { useState, useMemo, useContext } from "react";
import {
  NavLink,
  useNavigate,
  generatePath,
  useParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import {
  IoMoonOutline,
  IoCalendarOutline,
  IoHeartOutline,
  IoHomeOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { GrLanguage } from "react-icons/gr";
import Button from "@/components/common/Button/Button";
import ThemeToggle from "@/components/common/ThemeToggle/ThemeToggle";
import LanguageSwitcher from "@/components/common/Language/LanguageSwitcher";
import { ROUTES } from "@/constants/routes";
import { UserContext } from "@/components/context/UserContext";
import type { IUser } from "@/components/user/types";
import ProfileCard from "../ProfileCard/ProfileCard";
import { useLocation } from "react-router-dom";
import SocialLinks from "@/components/common/SocialLinks/SocialLinks";

interface MobileMenuProps {
  user: IUser | null;
}

const MobileMenu = ({ user }: MobileMenuProps) => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang = "en" } = useParams<{ lang?: string }>();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const HAMBURGER_LINKS = useMemo(
    () => [
      {
        href: generatePath(ROUTES.HOME, {
          lang,
        }),
        label: t("topbar.home"),
        icon: <IoHomeOutline />,
      },
      {
        href: generatePath(ROUTES.SERVICES, {
          lang,
        }),
        label: t("topbar.services"),
        icon: <MdOutlineHomeRepairService />,
      },
      ...(user?.email
        ? [
            {
              href: generatePath(ROUTES.BOOKINGS_FILTER, {
                lang,
                email: user.email,
                status: "Confirmed",
              }),
              label: t("accountModal.myBookings"),
              icon: <IoCalendarOutline />,
            },

            {
              href: generatePath(ROUTES.FAVORITES, {
                lang,
                email: user.email,
              }),
              label: t("accountModal.myFavorites"),
              icon: <IoHeartOutline />,
            },
          ]
        : []),
      {
        href: generatePath(ROUTES.FOR_BUSINESS_PARTNERS, {
          lang,
        }),
        label: t("common.forBusinessPartners"),
        icon: <HiOutlineBriefcase />,
      },
      {
        href: generatePath(ROUTES.ABOUT_US, {
          lang,
        }),
        label: t("common.aboutUs"),
        icon: <IoInformationCircleOutline />,
      },
    ],

    [lang, t, user?.email],
  );

  const { pathname } = useLocation();

  const activeHref = useMemo(() => {
    const sorted = [...HAMBURGER_LINKS].sort(
      (a, b) => b.href.length - a.href.length,
    );

    const match = sorted.find(
      ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
    );

    return match?.href;
  }, [pathname, HAMBURGER_LINKS]);

  const handleLogout = () => {
    close();
    logout();
    navigate(
      generatePath(ROUTES.HOME, {
        lang,
      }),
    );
  };

  return (
    <>
      {!open && (
        <IoMdMenu
          className={styles.trigger}
          fontSize={32}
          tabIndex={0}
          aria-label={t("alt.openMenu")}
          onClick={() => setOpen(true)}
        />
      )}

      {open && (
        <div className={styles.overlay} onClick={close}>
          <aside className={styles.panel} onClick={(e) => e.stopPropagation()}>
            <div className={styles.panelHeader}>
              <IoMdClose
                className={styles.closeTrigger}
                fontSize={32}
                tabIndex={0}
                aria-label={t("alt.closeMenu")}
                onClick={close}
              />
            </div>

            <div className={styles.menuSection}>
              {HAMBURGER_LINKS.map(({ href, label, icon }) => (
                <NavLink
                  key={label}
                  to={href}
                  onClick={close}
                  className={
                    href === activeHref
                      ? `${styles.menuItem} ${styles.active}`
                      : styles.menuItem
                  }
                >
                  <span className={styles.icon}>{icon}</span>
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>

            <div className={styles.settings}>
              <div className={styles.settingRow}>
                <span className={styles.settingLeft}>
                  <IoMoonOutline />
                  {t("topbar.theme")}
                </span>
                <ThemeToggle onSelect={close} />
              </div>

              <div className={styles.settingRow}>
                <span className={styles.settingLeft}>
                  <GrLanguage />
                  {t("topbar.language")}
                </span>
                <LanguageSwitcher onSelect={close} />
              </div>
            </div>

            {user ? (
              <div className={styles.profileSection}>
                <ProfileCard
                  user={user}
                  onClick={close}
                  className={styles.profileCard}
                />

                <Button
                  cancel
                  className={styles.logoutButton}
                  onClick={handleLogout}
                >
                  {t("accountModal.logOut")}
                </Button>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Button
                  outline
                  large
                  onClick={() => {
                    close();

                    navigate(
                      generatePath(ROUTES.LOGIN, {
                        lang,
                      }),
                    );
                  }}
                >
                  {t("buttons.login")}
                </Button>

                <Button
                  brand
                  large
                  onClick={() => {
                    close();

                    navigate(
                      generatePath(ROUTES.REGISTER, {
                        lang,
                      }),
                    );
                  }}
                >
                  {t("buttons.signUp")}
                </Button>
              </div>
            )}
            <SocialLinks />
          </aside>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
