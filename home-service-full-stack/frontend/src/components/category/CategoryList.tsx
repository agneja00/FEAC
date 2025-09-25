import styles from "./CategoryList.module.scss";
import CategoryCard from "./CategoryCard";
import { useCategories } from "./hooks";

const CategoryList: React.FC = () => {
  const { data: categories } = useCategories();

  return (
    <div className={styles.container}>
      {categories?.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}
          className={styles.card}
        />
      ))}
    </div>
  );
};

export default CategoryList;
