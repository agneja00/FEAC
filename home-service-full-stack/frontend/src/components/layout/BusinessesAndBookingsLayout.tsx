import styles from "./BusinessesAndBookingsLayout.module.scss";
import { PropsWithChildren } from "react";

const BusinessesAndBookingsLayout = ({ children }: PropsWithChildren) => {
  return <div className={styles.layout}>{children}</div>;
};

export default BusinessesAndBookingsLayout;
