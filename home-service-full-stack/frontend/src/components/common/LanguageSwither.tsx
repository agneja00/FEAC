import styles from "./LanguageSwitcher.module.scss";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();

  const currentLanguage = lang || i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);

    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${currentLanguage}`, `/${lng}`);
    navigate(newPath);
  };

  return (
    <div className={styles.buttonContainer}>
      <Button
        language
        onClick={() => changeLanguage("en")}
        active={currentLanguage === "en"}
      >
        EN
      </Button>
      <Button
        language
        onClick={() => changeLanguage("lt")}
        active={currentLanguage === "lt"}
      >
        LT
      </Button>
      <Button
        language
        onClick={() => changeLanguage("ru")}
        active={currentLanguage === "ru"}
      >
        RU
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
