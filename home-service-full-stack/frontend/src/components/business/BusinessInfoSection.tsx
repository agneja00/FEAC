import { useState } from "react";
import styles from "./BusinessInfoSection.module.scss";
import useCurrentBusiness from "./hooks";

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

      {isModalOpen && selectedImage && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className={styles.modalImage}
              src={selectedImage}
              alt="Selected Image"
            />
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessInfoSection;
