import styles from "./ServicesAndBookingsLayout.module.scss";
import { PropsWithChildren } from "react";

const ServicesAndBookingsLayout = ({ children }: PropsWithChildren) => {
  return <div className={styles.layout}>{children}</div>;
};

export default ServicesAndBookingsLayout;
