import styles from "../BrowseByCategory/BrowseByCategory.module.scss";
import { Link, generatePath, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoChevronForward } from "react-icons/io5";
import { ROUTES } from "@/constants/routes";
import ServiceList from "@/components/service/ServiceList";
import { useServiceData } from "@/components/service/hooks";

const PopularServices = () => {
  const { allServices } = useServiceData();
  const { t } = useTranslation();
  const { lang = "en" } = useParams<{ lang?: string }>();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("homePage.popularServices")}</h2>

        <Link
          to={generatePath(ROUTES.SERVICES, { lang })}
          className={styles.viewAll}
        >
          {t("buttons.viewAll")}
          <IoChevronForward className={styles.viewAllIcon} />
        </Link>
      </div>

      <ServiceList services={allServices} />
    </section>
  );
};

export default PopularServices;
