import styles from "./VerticalCategoryList.module.scss";
import CategoryCard from "./CategoryCard";
import { useCategories } from "./hooks";

const VerticalCategoryList: React.FC = () => {
  const { data: categories } = useCategories();

  return (
    <>
      <h2 className={styles.title}>Categories</h2>
      <div className={styles.container}>
        {categories?.map((category) => (
          <CategoryCard
            className={styles.card}
            key={category._id}
            category={category}
          />
        ))}
      </div>
    </>
  );
};

export default VerticalCategoryList;
