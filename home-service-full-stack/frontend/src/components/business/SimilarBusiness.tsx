import styles from "./SimilarBusiness.module.scss";
import { generatePath, Link } from "react-router-dom";
import useCurrentBusiness, { useBusinesses } from "./hooks";
import { ROUTES } from "@/constants/routes";

const SimilarBusiness: React.FC = () => {
  const { data: businesses } = useBusinesses();
  const { currentBusiness } = useCurrentBusiness();

  const similarBusiness = businesses?.filter(
    (business) =>
      business.category === currentBusiness?.category &&
      business._id !== currentBusiness._id,
  );
  const businessPath =
    similarBusiness && similarBusiness.length > 0
      ? generatePath(ROUTES.BUSINESS_ID, { id: similarBusiness[0]._id })
      : "#";

  return (
    <>
      <h3 className={styles.title}>Similar Business</h3>
      <div className={styles.similarContainer}>
        {similarBusiness?.map((simBusiness) => (
          <div className={styles.similarBusiness} key={simBusiness._id}>
            <img
              className={styles.businessImg}
              src={simBusiness.imageUrls[0]}
              alt={simBusiness.name}
            ></img>
            <div className={styles.detailsContainer}>
              <Link className={styles.similarName} to={businessPath}>
                {simBusiness.name}
              </Link>
              <p className={styles.contactPerson}>
                {simBusiness.contactPerson}
              </p>
              <p>{simBusiness.address}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SimilarBusiness;
