import styles from "./Topbar.module.scss";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Avatar from "../common/Avatar";

const Topbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    {
      href: ROUTES.HOME,
      label: "Home",
    },
    {
      href: ROUTES.SERVICES,
      label: "Services",
    },
    {
      href: ROUTES.ABOUT_US,
      label: "About Us",
    },
  ];

  return (
    <header className={styles.topbar}>
      <div className={styles.leftSide}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <img src="./logo.svg" alt="logo" />
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
            {links.map((link) => (
              <Link key={link.label} to={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
            <div>
              {user ? (
                <Avatar>{user.email[0]}</Avatar>
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
          <Avatar>{user.email[0]}</Avatar>
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
