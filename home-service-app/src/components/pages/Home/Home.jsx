import styles from "./Home.module.scss";
import Hero from "./Hero";
import CategoryList from "./CategoryList";
import BusinessList from "@/components/pages/Home/BusinessList";

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
