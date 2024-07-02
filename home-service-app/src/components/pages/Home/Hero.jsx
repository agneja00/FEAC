import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Button from "../../common/Button";
import SearchInput from "../../common/SearchInput";
import styles from "./Hero.module.scss";

const Hero = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChangeValue = (event) => {
    setSearchValue(event.target.value);
  };
  
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
        <SearchInput value={searchValue} onChange={handleChangeValue} />
        <Button rounded>
          <CiSearch fontSize={20} />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
