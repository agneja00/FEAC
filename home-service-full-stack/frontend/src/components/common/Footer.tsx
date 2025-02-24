import styles from "./Footer.module.scss";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return <p className={styles.footer}>{t("footer.copyright")}</p>;
};

export default Footer;
