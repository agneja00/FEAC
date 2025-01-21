import { useState } from "react";
import styles from "./BusinessInfoSection.module.scss";
import useCurrentBusiness from "./hooks";
import Modal from "../common/Modal";

const BusinessInfoSection: React.FC = () => {
  const { currentBusiness } = useCurrentBusiness();
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
      <h2 className={styles.title}>Description</h2>
      <p className={styles.sectionDescription}>{currentBusiness?.about}</p>
      <h2 className={styles.title}>Gallery</h2>
      <div className={styles.gallery}>
        {currentBusiness?.imageUrls?.length ? (
          currentBusiness.imageUrls.map((imageUrl, index) => (
            <img
              className={styles.businessImg}
              src={imageUrl}
              alt={`${currentBusiness?.name} photo ${index + 1}`}
              key={index}
              onClick={() => handleImageClick(imageUrl)}
            />
          ))
        ) : (
          <p className={styles.noImages}>No images available</p>
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

export default BusinessInfoSection;
