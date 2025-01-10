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

  const bookingPath = user?.email
    ? generatePath(ROUTES.BOOKINGS, { email: user.email })
    : null;

  const links = [
    {
      href: ROUTES.SERVICES,
      label: "Services",
    },
    {
      href: ROUTES.ABOUT_US,
      label: "About Us",
    },
    {
      href: ROUTES.FOR_BUSINESS_PARTNERS,
      label: "For Business Partners",
    },
  ];

  const renderModal = () => {
    return modalOpen ? (
      <Modal
        userEmail={user?.email}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <ul className={styles.dropdown}>
          <li className={styles.account}>My Account</li>
          {bookingPath && (
            <Link
              className={styles.link}
              to={bookingPath}
              onClick={() => setModalOpen(false)}
            >
              My Booking
            </Link>
          )}
          <Link className={styles.link} to={ROUTES.HOME} onClick={logout}>
            Logout
          </Link>
        </ul>
      </Modal>
    ) : null;
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.firstContainer}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <img src={Logo} alt="logo" />
        </Link>

        <div
          className={
            menuOpen
              ? styles.navigationMobileContainer
              : styles.navigationLargeContainer
          }
        >
          <nav
            className={
              menuOpen
                ? styles.navigationMobileContent
                : styles.navigationLargeContent
            }
          >
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={styles.link}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className={styles.navLine} />
          </nav>
        </div>
      </div>
      <div className={styles.secondContainer}>
        {user ? (
          <>
            {renderModal()}
            <Avatar onClick={() => setModalOpen(!modalOpen)}>
              {user?.email?.[0]}
            </Avatar>
          </>
        ) : (
          <Button onClick={() => navigate(ROUTES.LOGIN)} large>
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
          aria-label="Open menu"
          onKeyDown={(e) => e.key === "Enter" && setMenuOpen(true)}
        />
      ) : (
        <IoMdClose
          fontSize={32}
          onClick={() => setMenuOpen(false)}
          className={styles.menu}
          tabIndex={0}
          aria-label="Close menu"
          onKeyDown={(e) => e.key === "Enter" && setMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Topbar;
