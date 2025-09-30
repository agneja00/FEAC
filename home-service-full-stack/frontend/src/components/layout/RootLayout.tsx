import styles from "./Layout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "./Topbar";
import Footer from "../common/Footer";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import CircularProgress from "@mui/material/CircularProgress";
import { useIsFetching } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import FloatingThemeToggle from "../common/FloatingThemeToggle";

const supportedLanguages = ["en", "lt", "ru"];

const RootLayout = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lang = pathSegments[1];
  const { theme } = useTheme();

  const isInvalidLanguage = lang && !supportedLanguages.includes(lang);
  const isInvalidRoute = isInvalidLanguage || location.pathname.endsWith("/*");

  const isFetching = useIsFetching();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFetching > 0) {
      timer = setTimeout(() => setShowLoading(true), 300);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(timer);
  }, [isFetching]);

  return (
    <div data-theme={theme}>
      {showLoading && (
        <div className={styles.loadingBackdrop}>
          <CircularProgress size={80} thickness={4} />
        </div>
      )}
      {!isInvalidRoute && <Topbar />}
      {isInvalidRoute ? (
        <ErrorPage />
      ) : (
        <div className={styles.rootContainer}>
          <Outlet />
        </div>
      )}
      {!isInvalidRoute && <Footer />}
      <FloatingThemeToggle />
    </div>
  );
};

export default RootLayout;
