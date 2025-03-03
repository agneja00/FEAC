import styles from "./VerticalCategoryList.module.scss";
import CategoryCard from "./CategoryCard";
import { useCategories } from "./hooks";
import { useTranslation } from "react-i18next";

const VerticalCategoryList: React.FC = () => {
  const { t } = useTranslation();
  const { data: categories } = useCategories();

  return (
    <>
      <h2 className={styles.title}>{t("categories.categories")}</h2>
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
