import styles from "./Home.module.scss";
import PageTitle from "@/components/common/PageTitle";
import Hero from "@/components/common/Hero/Hero";
import BrowseByCategory from "./BrowseByCategory/BrowseByCategory";
import PopularServices from "./PopularServices/PopularServices";
import { useServiceData } from "@/components/service/hooks";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { isLoading, error } = useServiceData();
  const { t } = useTranslation();

  if (isLoading) {
    return <div>{t("common.loading")}</div>;
  }

  if (error) {
    return (
      <div>
        {t("common.error")}: {error.message}
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Home" />
      <Hero />
      <div className={styles.pageContent}>
        <BrowseByCategory />
        <PopularServices />
      </div>
    </>
  );
};

export default Home;
