import styles from "./AvatarMenu.module.scss";
import { useState, useRef, useEffect, useContext, useMemo } from "react";
import { Link, useNavigate, generatePath, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoChevronDown } from "react-icons/io5";
import Avatar from "../Avatar/Avatar";
import { UserContext } from "@/components/context/UserContext";
import type { IUser } from "@/components/user/types";
import { ROUTES } from "@/constants/routes";

interface AvatarMenuProps {
  user: IUser;
  mobile?: boolean;
}

const AvatarMenu = ({ user }: AvatarMenuProps) => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang = "en" } = useParams<{ lang?: string }>();

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const avatarUrl = user.photo?.startsWith("http") ? user.photo : undefined;

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const accountPath = generatePath(ROUTES.ACCOUNT, {
    lang,
    email: user.email,
  });

  const menuItems = useMemo(
    () => [
      {
        path: accountPath,
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
    ],
    [lang, t, user.email, accountPath],
  );

  const close = () => setOpen(false);

  const logoutHandler = () => {
    close();
    logout();
    navigate(generatePath(ROUTES.HOME, { lang }));
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={styles.trigger}
        type="button"
        aria-label={t("alt.accountMenu")}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Avatar src={avatarUrl} name={user.name ?? user.email} small />

        <IoChevronDown
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <Avatar src={avatarUrl} name={user.name ?? user.email} />

            <div className={styles.profileText}>
              <p className={styles.name}>{user.name ?? user.email}</p>

              <p className={styles.email}>{user.email}</p>
            </div>
          </div>

          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  role="menuitem"
                  className={
                    item.highlight ? styles.highlightLink : styles.link
                  }
                  onClick={close}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button className={styles.logoutButton} onClick={logoutHandler}>
            {t("accountModal.logOut")}
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
