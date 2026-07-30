import styles from "./LanguageSwitcher.module.scss";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { FiGlobe } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";

const LANGUAGES = [
  {
    code: "en",
    label: "English",
  },
  {
    code: "lt",
    label: "Lietuvių",
  },
  {
    code: "ru",
    label: "Русский",
  },
];

interface LanguageSwitcherProps {
  onSelect?: () => void;
}

const LanguageSwitcher = ({ onSelect }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const navigate = useNavigate();

  const { lang = "en" } = useParams();

  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);

    navigate(window.location.pathname.replace(`/${lang}`, `/${lng}`));

    setOpen(false);
    onSelect?.();
  };

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FiGlobe className={styles.globus} />

        <span>{current.code.toUpperCase()}</span>

        <IoChevronDown className={open ? styles.rotate : ""} />
      </button>

      {open && (
        <div className={styles.dropdown}>
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              className={`${styles.option} ${
                current.code === language.code ? styles.active : ""
              }`}
              onClick={() => changeLanguage(language.code)}
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
