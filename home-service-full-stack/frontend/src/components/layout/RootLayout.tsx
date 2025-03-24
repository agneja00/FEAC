import styles from "./Layout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "./Topbar";
import Footer from "../common/Footer";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { Box, CircularProgress } from "@mui/material";
import { useIsFetching } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const supportedLanguages = ["en", "lt", "ru"];

const RootLayout = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lang = pathSegments[1];

  const isInvalidLanguage = lang && !supportedLanguages.includes(lang);

  const isInvalidRoute = isInvalidLanguage || location.pathname.endsWith("/*");

  const isFetching = useIsFetching();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isFetching > 0) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 300);
    } else {
      setShowLoading(false);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isFetching]);

  return (
    <>
      {showLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 9999,
          }}
        >
          <CircularProgress size={80} thickness={4} />
        </Box>
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
    </>
  );
};

export default RootLayout;
