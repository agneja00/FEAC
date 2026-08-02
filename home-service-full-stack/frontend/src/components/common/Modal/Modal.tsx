import classNames from "classnames";
import styles from "./Modal.module.scss";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  userEmail?: string;
  accountModal?: boolean;
  imageModal?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  accountModal,
  imageModal,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={classNames(
        !accountModal && !imageModal && styles.modalContainer,
        accountModal && styles.accountModalContainer,
        imageModal && styles.imageModalContainer,
      )}
      onClick={onClose}
    >
      <div
        className={classNames(
          !accountModal && !imageModal && styles.modalContent,
          accountModal && styles.accountModalContent,
          imageModal && styles.imageModalContent,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <IoCloseOutline
          className={classNames(
            !accountModal && !imageModal && styles.closeButton,
            accountModal && styles.accountCloseButton,
            imageModal && styles.imageCloseButton,
          )}
          fontSize={40}
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
