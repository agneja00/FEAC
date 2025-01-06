import styles from "./Topbar.module.scss";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import Button from "../common/Button";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Avatar from "../common/Avatar";
import Modal from "../common/Modal";

const Topbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <header className={styles.topbar}>
      <div className={styles.leftSide}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <img src={Logo} alt="logo" />
        </Link>
        <nav className={styles.navigation}>
          {links.map((link) => (
            <Link key={link.label} to={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>
        {menuOpen && (
          <nav className={styles.navigationMobile}>
            <ul className={styles.list}>
              {links.map((link) => (
                <Link key={link.label} to={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </ul>
            <div>
              {user ? (
                <>
                  {modalOpen && <Modal userEmail={user.email} />}
                  <Avatar onClick={() => setModalOpen(!modalOpen)}>
                    {user.email[0]}
                  </Avatar>
                </>
              ) : (
                <Button onClick={() => navigate(ROUTES.LOGIN)} large>
                  Login / Sign Up
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
      <div className={styles.rightSide}>
        {user ? (
          <>
            {modalOpen && <Modal userEmail={user.email} />}
            <Avatar onClick={() => setModalOpen(!modalOpen)}>
              {user.email[0]}
            </Avatar>
          </>
        ) : (
          <Button onClick={() => navigate(ROUTES.LOGIN)} large>
            Login / Sign Up
          </Button>
        )}
      </div>
      {!menuOpen && (
        <IoMdMenu
          fontSize={32}
          onClick={() => setMenuOpen(true)}
          className={styles.menu}
        />
      )}
      {menuOpen && (
        <IoMdClose
          fontSize={32}
          onClick={() => setMenuOpen(false)}
          className={styles.menu}
        />
      )}
    </header>
  );
};

export default Topbar;
