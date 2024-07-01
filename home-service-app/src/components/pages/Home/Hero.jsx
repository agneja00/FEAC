import { CiSearch } from "react-icons/ci";
import Button from "../../common/Button";
import SearchInput from "../../common/SearchInput";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>
        Find Home <span className={styles.primary}>Service/Repair</span>
        <br />
        Near You
      </h1>
      <p className={styles.subtitle}>
        Explore Best Home Service & Repair near you
      </p>
      <div className={styles.searchContainer}>
        <SearchInput />
        <Button rounded>
          <CiSearch fontSize={20} />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
