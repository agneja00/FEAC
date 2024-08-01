import styles from "./CategoryList.module.scss";
import CategoryCard from "./CategoryCard";
import { useCategories } from "./hooks";
import { Category } from "./types";

const CategoryList: React.FC = () => {
  const { data: categories } = useCategories();
  const categoriesTyped = categories as Category[];

  return (
    <div className={styles.container}>
      {categoriesTyped?.map((category) => (
        <CategoryCard
          key={category.name}
          category={category}
          className={styles.card}
        />
      ))}
    </div>
  );
};

export default CategoryList;
