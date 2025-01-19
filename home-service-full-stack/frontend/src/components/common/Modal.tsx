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
      className={
        accountModal ? styles.accountModalContainer : styles.modalContainer
      }
      onClick={onClose}
    >
      <div
        className={
          accountModal ? styles.accountModalContent : styles.modalContent
        }
        onClick={(e) => e.stopPropagation()}
      >
        <IoCloseOutline
          className={
            accountModal ? styles.accountCloseButton : styles.closeButton
          }
          fontSize={40}
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
