import { useParams, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const supportedLanguages = ["en", "lt", "ru"];

const LanguageValidator = () => {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "en";
  const { i18n } = useTranslation();

  useEffect(() => {
    if (
      supportedLanguages.includes(currentLang) &&
      i18n.language !== currentLang
    ) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang, i18n]);

  if (!supportedLanguages.includes(currentLang)) {
    return <ErrorPage />;
  }

  return <Outlet />;
};

export default LanguageValidator;
