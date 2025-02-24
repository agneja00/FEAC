import { useState } from "react";
import styles from "./ServiceInfoSection.module.scss";
import { useCurrentService } from "./hooks";
import Modal from "../common/Modal";
import { useTranslation } from "react-i18next";

const ServiceInfoSection: React.FC = () => {
  const { t } = useTranslation();
  const { currentService } = useCurrentService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <h2 className={styles.title}>{t("servicePage.description")}</h2>
      <p className={styles.sectionDescription}>{currentService?.about}</p>
      <h2 className={styles.title}>{t("servicePage.gallery")}</h2>
      <div className={styles.gallery}>
        {currentService?.imageUrls?.length ? (
          currentService.imageUrls.map((imageUrl, index) => (
            <img
              className={styles.serviceImg}
              src={imageUrl}
              alt={`${currentService?.name} photo ${index + 1}`}
              key={index}
              onClick={() => handleImageClick(imageUrl)}
            />
          ))
        ) : (
          <p className={styles.noImages}>{t("messages.noImages")}</p>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} imageModal>
        {selectedImage && (
          <img
            className={styles.modalImage}
            src={selectedImage}
            alt="Selected Image"
          />
        )}
      </Modal>
    </>
  );
};

export default ServiceInfoSection;
