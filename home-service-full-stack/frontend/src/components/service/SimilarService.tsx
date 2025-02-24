import styles from "./SimilarService.module.scss";
import { generatePath, Link } from "react-router-dom";
import { useServices, useCurrentService } from "./hooks";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "react-i18next";

const SimilarService: React.FC = () => {
  const { t } = useTranslation();
  const { data: services } = useServices();
  const { currentService } = useCurrentService();

  const similarService = services?.filter(
    (service) =>
      service.category === currentService?.category &&
      service._id !== currentService._id,
  );
  const servicePath =
    similarService && similarService.length > 0
      ? generatePath(ROUTES.SERVICE_ID, { id: similarService[0]._id })
      : "#";

  return (
    <>
      <h3 className={styles.title}>{t("servicePage.similarServices")}</h3>
      <div className={styles.similarContainer}>
        {similarService?.map((simService) => (
          <div className={styles.similarBusiness} key={simService._id}>
            <img
              className={styles.businessImg}
              src={simService.imageUrls[0]}
              alt={simService.name}
            ></img>
            <div className={styles.detailsContainer}>
              <Link className={styles.similarName} to={servicePath}>
                {simService.name}
              </Link>
              <p className={styles.contactPerson}>{simService.contactPerson}</p>
              <p>{simService.address}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SimilarService;
