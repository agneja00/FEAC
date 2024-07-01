import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import styles from "./Layout.module.scss";

const AuthLayout = () => {
  return (
    <>
      <Topbar />
      <div className={styles.authContainer}>
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
