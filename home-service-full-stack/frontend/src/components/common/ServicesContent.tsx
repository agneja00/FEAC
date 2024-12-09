import { useParams } from "react-router-dom";
import styles from "./ServicesContent.module.scss";
import BusinessList from "@/components/business/BusinessList";
import VerticalCategoryList from "@/components/category/VerticalCategoryList";
import { useState, useEffect } from "react";
import { useBusinesses } from "@/components/business/hooks";
import { Business } from "../business/types";
import SearchInput from "../common/SearchInput";

type Params = {
  category?: string;
};

const ServicesContent: React.FC = () => {
  const { data: allBusinesses } = useBusinesses();
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const { category } = useParams<Params>();

  useEffect(() => {
    if (allBusinesses) {
      const filtered = allBusinesses.filter(
        (bus) =>
          (!category || bus.category === category) &&
          bus.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredBusinesses(filtered);
    }
  }, [allBusinesses, category, searchValue]);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <SearchInput value={searchValue} onChange={handleChangeValue} />
      </div>
      <div className={styles.container}>
        <div className={styles.categories}>
          <VerticalCategoryList />
        </div>
        <div className={styles.categoryContainer}>
          <BusinessList
            categoryName={category}
            className={styles.businessList}
            businesses={filteredBusinesses}
          />
        </div>
      </div>
    </>
  );
};

export default ServicesContent;
