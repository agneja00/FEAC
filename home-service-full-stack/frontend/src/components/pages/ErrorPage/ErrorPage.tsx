import { useTranslation } from "react-i18next";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import styles from "./ErrorPage.module.scss";
import Button from "@/components/common/Button";
import { ROUTES } from "@/constants/routes";

const supportedLanguages = ["en", "lt", "ru"];

const ErrorPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();

  const selectedLang = supportedLanguages.includes(lang || "") ? lang : "en";

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>{t("errorPage.errorMessage")}</p>
        <Button
          onClick={() =>
            navigate(generatePath(ROUTES.HOME, { lang: selectedLang }))
          }
        >
          {t("errorPage.backHome")}
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
