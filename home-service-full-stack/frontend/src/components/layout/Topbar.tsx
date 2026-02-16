import styles from "./Topbar.module.scss";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, useNavigate, generatePath, useParams } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import Button from "../common/Button";
import { ROUTES } from "@/constants/routes";
import { useState, useContext, useMemo, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Avatar from "../common/Avatar";
import Modal from "../common/Modal";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../common/LanguageSwither";

const Topbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
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

  const USER_MENU_ITEMS = useMemo(() => {
    if (!user?.email) return [];

    return [
      {
        path: generatePath(ROUTES.ACCOUNT, {
          lang,
          email: user.email,
        }),
        label: t("accountModal.myAccount"),
        highlight: true,
      },
      {
        path: generatePath(ROUTES.BOOKINGS_FILTER, {
          lang,
          email: user.email,
          status: "Confirmed",
        }),
        label: t("accountModal.myBookings"),
      },
      {
        path: generatePath(ROUTES.FAVORITES, {
          lang,
          email: user.email,
        }),
        label: t("accountModal.myFavorites"),
      },
      {
        path: generatePath(ROUTES.HOME, { lang }),
        label: t("accountModal.logOut"),
        action: "logout",
      },
    ];
  }, [user?.email, lang, t]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
        setModalOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  const handleModalClose = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (modalOpen && !target.closest(`.${styles.accountModalContent}`)) {
      setModalOpen(false);
    } else if (
      menuOpen &&
      !target.closest(`.${styles.navigationMobileContent}`) &&
      !modalOpen
    ) {
      setMenuOpen(false);
    }
  };

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(!modalOpen);
  };

  const handleMenuItemClick = (item: (typeof USER_MENU_ITEMS)[number]) => {
    setMenuOpen(false);
    setModalOpen(false);

    if (item.action === "logout") {
      logout();
      return;
    }

    navigate(item.path);
  };

  const avatarUrl = user?.photo?.startsWith("http") ? user.photo : undefined;

  return (
    <header className={styles.topbar}>
      <div className={styles.headerLeftSide}>
        <Link
          to={generatePath(ROUTES.HOME, { lang })}
          className={styles.logo}
          onClick={handleModalClose}
        >
          <img src={Logo} alt={t("alt.logo")} />
        </Link>
      </div>
      <LanguageSwitcher />
      <div
        className={
          menuOpen
            ? styles.navigationMobileContainer
            : styles.navigationLargeContainer
        }
        onClick={handleModalClose}
      >
        <nav
          className={
            menuOpen
              ? styles.navigationMobileContent
              : styles.navigationLargeContent
          }
        >
          {NAVIGATION_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              to={href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <hr className={styles.navLine} />
        </nav>
        {user ? (
          <>
            {modalOpen && USER_MENU_ITEMS.length > 0 && (
              <Modal
                userEmail={user.email}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                accountModal
              >
                <ul className={styles.accountModalContent}>
                  {USER_MENU_ITEMS.map((item) => (
                    <li key={item.label}>
                      <Link
                        className={`${
                          item.highlight
                            ? styles.myAccountLink
                            : styles.accountLink
                        }`}
                        to={item.path}
                        onClick={() => handleMenuItemClick(item)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Modal>
            )}
            <Avatar
              className={menuOpen ? styles.avatarMobile : styles.avatarLarge}
              onClick={handleAvatarClick}
              src={avatarUrl}
            >
              {!avatarUrl && user?.email?.[0]}
            </Avatar>
          </>
        ) : (
          <Button
            className={menuOpen ? styles.buttonMobile : styles.buttonLarge}
            onClick={() => navigate(generatePath(ROUTES.LOGIN, { lang }))}
            large
          >
            {t("buttons.loginOrSign")}
          </Button>
        )}
      </div>

      {!menuOpen ? (
        <IoMdMenu
          fontSize={32}
          onClick={() => setMenuOpen(true)}
          className={styles.menu}
          tabIndex={0}
          aria-label={t("alt.openMenu")}
        />
      ) : (
        <IoMdClose
          fontSize={32}
          onClick={() => {
            setMenuOpen(false);
            setModalOpen(false);
          }}
          className={styles.menu}
          tabIndex={0}
          aria-label={t("alt.closeMenu")}
        />
      )}
    </header>
  );
};

export default Topbar;
