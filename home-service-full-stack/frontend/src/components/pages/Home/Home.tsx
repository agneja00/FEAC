import styles from "./Home.module.scss";
import Hero from "@/components/common/Hero";
import CategoryList from "@/components/category/CategoryList";
import BusinessList from "@/components/business/BusinessList";

const Home = () => {
  return (
    <>
      <Hero />
      <CategoryList />
      <h2 className={styles.title}>Popular businesses</h2>
      <BusinessList />
    </>
  );
};

export default Home;
