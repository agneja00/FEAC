import styles from "./LanguageSwitcher.module.scss";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.buttonContainer}>
      <Button language onClick={() => changeLanguage("en")}>
        EN
      </Button>
      <Button language onClick={() => changeLanguage("lt")}>
        LT
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
