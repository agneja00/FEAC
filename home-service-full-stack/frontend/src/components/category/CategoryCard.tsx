import styles from "./CategoryCard.module.scss";
import { useNavigate, generatePath, useParams } from "react-router-dom";
import classNames from "classnames";
import { ROUTES } from "@/constants/routes";
import { Category } from "./types";
import UrlIcon from "../common/UrlIcon";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, className }) => {
  const params = useParams<{ category?: string }>();
  const { name } = category;
  const navigate = useNavigate();

  const categoryPath = generatePath(ROUTES.SEARCH_CATEGORY, { category: name });
  const activeCategory = params.category;

  return (
    <div
      className={classNames(
        styles.card,
        activeCategory === name && styles.active,
        className
      )}
      onClick={() => navigate(categoryPath)}
    >
      <UrlIcon src={category.url} alt={`icon ${category.name}`} />
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default CategoryCard;
