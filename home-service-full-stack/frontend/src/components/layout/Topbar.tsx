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

const Topbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const generateUserPath = (route: string) =>
    user?.email ? generatePath(route, { email: user.email }) : null;

  const bookingPath = generateUserPath(ROUTES.BOOKINGS);
  const favoritePath = generateUserPath(ROUTES.FAVORITES);

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

  const links = [
    { href: ROUTES.SERVICES, label: "Services" },
    { href: ROUTES.ABOUT_US, label: "About Us" },
    { href: ROUTES.FOR_BUSINESS_PARTNERS, label: "For Business Partners" },
  ];

  return (
    <header className={styles.topbar}>
      <Link to={ROUTES.HOME} className={styles.logo} onClick={handleModalClose}>
        <img src={Logo} alt="logo" />
      </Link>

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
          {links.map(({ href, label }) => (
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
                  <li className={styles.account}>My Account</li>
                  {bookingPath && (
                    <Link
                      className={styles.accountLink}
                      to={bookingPath}
                      onClick={() => {
                        setMenuOpen(false);
                        setModalOpen(false);
                      }}
                    >
                      My Bookings
                    </Link>
                  )}
                  {favoritePath && (
                    <Link
                      className={styles.accountLink}
                      to={favoritePath}
                      onClick={() => {
                        setMenuOpen(false);
                        setModalOpen(false);
                      }}
                    >
                      My Favorites
                    </Link>
                  )}
                  <Link
                    className={styles.accountLink}
                    to={ROUTES.HOME}
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                      setModalOpen(false);
                    }}
                  >
                    Logout
                  </Link>
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
            Login / Sign Up
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
