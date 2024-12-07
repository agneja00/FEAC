import { useParams } from "react-router-dom";
import styles from "./ServicesContent.module.scss";
import BusinessList from "@/components/business/BusinessList";
import VerticalCategoryList from "@/components/category/VerticalCategoryList";
import { SetStateAction, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Button from "../common/Button";
import SearchInput from "../common/SearchInput";

type Params = {
  category?: string;
};

const ServicesContent: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChangeValue = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchValue(event.target.value);
  };
  const { category } = useParams<Params>();

  return (
    <>
      <div className={styles.searchContainer}>
        <SearchInput value={searchValue} onChange={handleChangeValue} />
        <Button rounded>
          <CiSearch fontSize={20} />
        </Button>
      </div>
      <div className={styles.container}>
        <div className={styles.categories}>
          <VerticalCategoryList />
        </div>
        <div className={styles.categoryContainer}>
          <BusinessList
            categoryName={category}
            className={styles.businessList}
          />
        </div>
      </div>
    </>
  );
};

export default ServicesContent;
