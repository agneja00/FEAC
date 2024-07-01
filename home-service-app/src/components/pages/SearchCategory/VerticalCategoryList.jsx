import { categories } from "@/constants/category.js";
import VerticalCategoryCard from "./VerticalCategoryCard";
import styles from "./VerticalCategoryList.module.scss";

const VerticalCategoryList = () => {
  return (
    <div>
      <h2 className={styles.title}>Categories</h2>
      {categories.map((category) => (
        <VerticalCategoryCard key={category.name} category={category} />
      ))}
    </div>
  );
};

export default VerticalCategoryList;
