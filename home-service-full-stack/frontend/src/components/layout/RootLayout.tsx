import styles from "./Layout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "./Topbar";
import Footer from "../common/Footer";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const supportedLanguages = ["en", "lt", "ru"];

const RootLayout = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lang = pathSegments[1];

  const isInvalidLanguage = !supportedLanguages.includes(lang);
  const isInvalidRoute = isInvalidLanguage || location.pathname.endsWith("/*");

  return (
    <>
      {!isInvalidRoute && <Topbar />}
      {isInvalidRoute ? (
        <ErrorPage />
      ) : (
        <div className={styles.rootContainer}>
          <Outlet />
        </div>
      )}
      {!isInvalidRoute && <Footer />}
    </>
  );
};

export default RootLayout;
