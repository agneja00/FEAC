import styles from "./Home.module.scss";
import PageTitle from "@/components/common/PageTitle";
import CategoryList from "@/components/category/CategoryList";
import ServiceList from "@/components/service/ServiceList";
import { useServiceData } from "@/components/service/hooks";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { allServices, isLoading, error } = useServiceData();
  const { t } = useTranslation();

  if (isLoading) return <div>{t("common.loading")}</div>;

  if (error)
    return (
      <div>
        {t("common.error")}: {error.message}
      </div>
    );

  return (
    <>
      <PageTitle title="Home" />
      <section className={styles.hero}>
        <h1 className={styles.title}>
          {t("homePage.findHome")}{" "}
          <span className={styles.primary}>{t("homePage.serviceRepair")}</span>
          <br />
          {t("homePage.nearYou")}
        </h1>
        <p className={styles.subtitle}>{t("homePage.explore")}</p>
      </section>
      <CategoryList />
      <h2 className={styles.businessTitle}>
        {t("homePage.popularBusinesses")}
      </h2>
      <ServiceList services={allServices} />
    </>
  );
};

export default Home;
