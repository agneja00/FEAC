import { useParams, Outlet } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const supportedLanguages = ["en", "lt", "ru"];

const LanguageValidator = () => {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "en";

  if (!supportedLanguages.includes(currentLang)) {
    return <ErrorPage />;
  }

  return <Outlet />;
};

export default LanguageValidator;
