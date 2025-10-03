import styles from "./SimilarService.module.scss";
import { generatePath, Link, useParams } from "react-router-dom";
import { useServices, useCurrentService } from "./hooks";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "react-i18next";
import ResponsiveImage from "../common/ResponsiveImage";

const SimilarService: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const language = lang || i18n.language || "en";

  const { data: services } = useServices(language);
  const { currentService } = useCurrentService();

  const similarService = services?.filter(
    (service) =>
      service.category === currentService?.category &&
      service._id !== currentService._id
  );

  return (
    <>
      <h3 className={styles.title}>{t("servicePage.similarServices")}</h3>
      <div className={styles.similarContainer}>
        {similarService?.map((simService) => {
          const simName =
            simService.translations?.name?.[language] || simService.name;
          return (
            <div className={styles.similarBusiness} key={simService._id}>
              <ResponsiveImage
                className={styles.businessImg}
                src={simService.imageUrls[0]}
                alt={t("alt.serviceImage", { serviceName: simName })}
              />
              <div className={styles.detailsContainer}>
                <Link
                  className={styles.similarName}
                  to={generatePath(ROUTES.SERVICE_ID, {
                    lang: language,
                    id: simService._id,
                  })}
                >
                  {simName}
                </Link>
                <p className={styles.contactPerson}>
                  {simService.contactPerson}
                </p>
                <p>{simService.address}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SimilarService;
