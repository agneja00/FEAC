import classNames from "classnames";
import styles from "./Modal.module.scss";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  userEmail?: string;
  accountModal?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  accountModal,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={classNames(
        styles.modalContainer,
        accountModal && styles.accountModalContainer,
      )}
      onClick={onClose}
    >
      <div
        className={classNames(
          styles.modalContent,
          accountModal && styles.accountModalContent,
        )}
        onClick={(e) => e.stopPropagation()}
      >
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
