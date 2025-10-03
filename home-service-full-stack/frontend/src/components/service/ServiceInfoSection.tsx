import { useState } from "react";
import styles from "./ServiceInfoSection.module.scss";
import { useCurrentService } from "./hooks";
import Modal from "../common/Modal";
import { useTranslation } from "react-i18next";
import ResponsiveImage from "../common/ResponsiveImage";

const ServiceInfoSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { currentService } = useCurrentService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const language = i18n.language || "en";
  const name =
    currentService?.translations?.name?.[language] || currentService?.name;

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
            <ResponsiveImage
              className={styles.serviceImg}
              src={imageUrl}
              alt={t("alt.serviceImage", { serviceName: name })}
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
          <ResponsiveImage
            className={styles.modalImage}
            src={selectedImage}
            alt={t("alt.serviceImage", { serviceName: name })}
          />
        )}
      </Modal>
    </>
  );
};

export default ServiceInfoSection;
