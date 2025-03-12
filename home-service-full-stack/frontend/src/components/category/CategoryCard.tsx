import React from "react";
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
  const params = useParams<{ lang?: string; category?: string }>();
  const navigate = useNavigate();
  const lang = params.lang || "en";

  const categoryName = category.name;

  const categoryPath =
    categoryName === "All" || categoryName === "Visos" || categoryName === "Все"
      ? generatePath(ROUTES.SERVICES, { lang })
      : generatePath(ROUTES.SERVICES_CATEGORY, {
          lang,
          category: categoryName,
        });

  const isActive =
    category.name.toLowerCase() === (params.category || "").toLowerCase();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate(categoryPath);
    }
  };

  return (
    <div
      className={classNames(styles.card, isActive && styles.active, className)}
      onClick={() => navigate(categoryPath)}
      role="button"
      tabIndex={0}
      aria-label={`View ${categoryName} services`}
      onKeyDown={handleKeyDown}
    >
      <UrlIcon src={category.url} alt={`${categoryName} icon`} />
      <p className={styles.name}>{categoryName}</p>
    </div>
  );
};

export default CategoryCard;
