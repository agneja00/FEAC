import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Topbar from "./Topbar";

const RootLayout = () => {
  return (
    <>
      <Topbar />
      <div className={styles.rootContainer}>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
