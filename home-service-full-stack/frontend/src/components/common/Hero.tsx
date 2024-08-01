import styles from "./Hero.module.scss";
import { SetStateAction, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Button from "../common/Button";
import SearchInput from "../common/SearchInput";

const Hero = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChangeValue = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchValue(event.target.value);
  };

  return (
    <section className={styles.hero}>
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
    </section>
  );
};

export default Hero;
