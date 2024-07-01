import styles from "./CategoryList.module.scss";
import CategoryCard from "./CategoryCard";
import { categories } from "@/constants/category";

const CategoryList = () => {
  return (
    <div className={styles.container}>
      {categories.map((category) => (
        <CategoryCard key={category.name} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
