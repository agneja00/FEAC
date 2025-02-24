import styles from "./Topbar.module.scss";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, useNavigate, generatePath } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import Button from "../common/Button";
import { ROUTES } from "@/constants/routes";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Avatar from "../common/Avatar";
import Modal from "../common/Modal";
import { BookingStatus } from "../booking/types";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../common/LanguageSwither";

const Topbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const NAVIGATION_LINKS = [
    { href: ROUTES.SERVICES, label: t("topbar.services") },
    { href: ROUTES.ABOUT_US, label: t("common.aboutUs") },
    {
      href: ROUTES.FOR_BUSINESS_PARTNERS,
      label: t("common.forBusinessPartners"),
    },
  ];

  const USER_MENU_ITEMS = [
    { href: ROUTES.BOOKINGS_FILTER, label: t("accountModal.myBookings") },
    { href: ROUTES.FAVORITES, label: t("accountModal.myFavorites") },
    { href: ROUTES.HOME, label: t("accountModal.logOut"), action: "logout" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState<BookingStatus>("Confirmed");

  const generateUserPath = (route: string) =>
    user?.email
      ? generatePath(route, { email: user.email, status: activeStatus })
      : null;

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

    navigate(item.href);
  };

  return (
    <header className={styles.topbar}>
      <Link to={ROUTES.HOME} className={styles.logo} onClick={handleModalClose}>
        <img src={Logo} alt="logo" />
      </Link>
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
            {modalOpen && (
              <Modal
                userEmail={user?.email}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                accountModal
              >
                <ul className={styles.accountModalContent}>
                  <li className={styles.account}>
                    {t("accountModal.myAccount")}
                  </li>
                  {USER_MENU_ITEMS.map((item) => {
                    const path = generateUserPath(item.href);
                    if (!path) return null;

                    return (
                      <li key={item.label}>
                        <Link
                          className={styles.accountLink}
                          to={path}
                          onClick={() => handleMenuItemClick(item)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Modal>
            )}
            <Avatar
              className={menuOpen ? styles.avatarMobile : styles.avatarLarge}
              onClick={handleAvatarClick}
            >
              {user?.email?.[0]}
            </Avatar>
          </>
        ) : (
          <Button
            className={menuOpen ? styles.buttonMobile : styles.buttonLarge}
            onClick={() => navigate(ROUTES.LOGIN)}
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
          aria-label="Open navigation menu"
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
          aria-label="Close navigation menu"
        />
      )}
    </header>
  );
};

export default Topbar;
