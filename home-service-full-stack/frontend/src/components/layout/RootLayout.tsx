import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Topbar from "./Topbar";
import Footer from "../common/Footer";

const RootLayout = () => {
  return (
    <>
      <Topbar />
      <div className={styles.rootContainer}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
