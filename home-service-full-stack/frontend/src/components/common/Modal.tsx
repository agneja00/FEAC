import styles from "./Modal.module.scss";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  userEmail?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <IoCloseOutline
          className={styles.close}
          fontSize={40}
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
