import styles from "./BrowseByCategory.module.scss";
import { Link, generatePath, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CategoryList from "@/components/category/CategoryList";
import { ROUTES } from "@/constants/routes";

const BrowseByCategory = () => {
  const { t } = useTranslation();
  const { lang = "en" } = useParams<{ lang?: string }>();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("homePage.browseByCategory")}</h2>

        <Link
          to={generatePath(ROUTES.SERVICES, { lang })}
          className={styles.viewAll}
        >
          {t("buttons.viewAll")}
        </Link>
      </div>

      <CategoryList />
    </section>
  );
};

export default BrowseByCategory;
