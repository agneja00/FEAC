import { useParams } from "react-router-dom";
import styles from "./SearchCategory.module.scss";
import BusinessList from "@/components/business/BusinessList";
import VerticalCategoryList from "@/components/category/VerticalCategoryList";

type Params = {
  category: string;
};

const SearchCategory: React.FC = () => {
  const { category } = useParams<Params>();

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <VerticalCategoryList />
      </div>
      <div className={styles.categoryContainer}>
        <h2 className={styles.title}>{category}</h2>
        <BusinessList categoryName={category} className={styles.businessList} />
      </div>
    </div>
  );
};

export default SearchCategory;
