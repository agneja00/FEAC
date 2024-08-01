import styles from "./VerticalCategoryList.module.scss";
import CategoryCard from "./CategoryCard";
import { useCategories } from "./hooks";
import { Category } from "./types";

const VerticalCategoryList: React.FC = () => {
  const { data: categories } = useCategories();
  const categoriesTyped = categories as Category[];

  return (
    <>
      <h2 className={styles.title}>Categories</h2>
      <div className={styles.container}>
        {categoriesTyped?.map((category) => (
          <CategoryCard
            className={styles.card}
            key={category.name}
            category={category}
          />
        ))}
      </div>
    </>
  );
};

export default VerticalCategoryList;
