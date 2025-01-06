import styles from "./Modal.module.scss";
import { generatePath, Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";

interface ModalProps {
  userEmail: string;
}
const Modal = ({ userEmail }: ModalProps) => {
  const bookingPath = generatePath(ROUTES.BOOKINGS, { email: userEmail });
  const { logout } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <>
      {modalOpen && (
        <ul className={styles.dropdown}>
          <li className={styles.account}>My account</li>
          <Link
            className={styles.link}
            to={bookingPath}
            onClick={() => setModalOpen(false)}
          >
            My Booking
          </Link>
          <Link className={styles.link} to={ROUTES.HOME} onClick={logout}>
            Logout
          </Link>
        </ul>
      )}
    </>
  );
};
export default Modal;
