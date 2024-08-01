import styles from "./BusinessInfoSection.module.scss";
import useCurrentBusiness from "./hooks";

const BusinessInfoSection: React.FC = () => {
  const { currentBusiness } = useCurrentBusiness();

  return (
    <>
      <h2 className={styles.title}>Description</h2>
      <p className={styles.sectionDescription}>{currentBusiness?.about}</p>
      <h2 className={styles.title}>Gallary</h2>
      <div className={styles.gallary}>
        {currentBusiness?.imageUrls.map((imageUrl, index) => (
          <img
            className={styles.businessImg}
            src={imageUrl}
            alt={`business photo ${index}`}
            key={index}
          />
        ))}
      </div>
    </>
  );
};

export default BusinessInfoSection;
