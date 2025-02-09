import styles from "./Home.module.scss";
import CategoryList from "@/components/category/CategoryList";
import ServiceList from "@/components/service/ServiceList";
import { useServiceData } from "@/components/service/hooks";

const Home = () => {
  const { allServices, favoriteServices } = useServiceData();

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Find Home <span className={styles.primary}>Service/Repair</span>
          <br />
          Near You
        </h1>
        <p className={styles.subtitle}>
          Explore Best Home Service & Repair near you
        </p>
      </section>
      <CategoryList />
      <h2 className={styles.businessTitle}>Popular businesses</h2>
      <ServiceList services={allServices} favoriteServices={favoriteServices} />
    </>
  );
};

export default Home;
