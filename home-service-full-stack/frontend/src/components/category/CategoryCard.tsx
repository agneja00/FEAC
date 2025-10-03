import styles from "./CategoryCard.module.scss";
import { useNavigate, generatePath, useParams } from "react-router-dom";
import classNames from "classnames";
import { ROUTES } from "@/constants/routes";
import { ICategory } from "./types";
import UrlIcon from "../common/UrlIcon";
import { useTranslation } from "react-i18next";

const categoryTranslations: Record<string, Record<string, string>> = {
  shifting: { lt: "Perkraustymas", ru: "Переезд" },
  repair: { lt: "Remontas", ru: "Ремонт" },
  plumbing: { lt: "Santechnika", ru: "Сантехника" },
  cleaning: { lt: "Valymas", ru: "Уборка" },
  painting: { lt: "Dažymas", ru: "Покраска" },
  electric: { lt: "Elektra", ru: "Электрика" },
  decoration: { lt: "Dekoravimas", ru: "Декорирование" },
  all: { lt: "Visos", ru: "Все" },
};

interface CategoryCardProps {
  category: ICategory;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, className }) => {
  const { t, i18n } = useTranslation();
  const params = useParams<{ lang?: string; category?: string }>();
  const navigate = useNavigate();
  const lang = params.lang || i18n.language || "en";

  const baseName = category.name.toLowerCase();
  const translatedName =
    categoryTranslations[baseName]?.[lang as "lt" | "ru"] || category.name;

  const categoryPath = ["all", "visos", "все"].includes(
    translatedName.toLowerCase(),
  )
    ? generatePath(ROUTES.SERVICES, { lang })
    : generatePath(ROUTES.SERVICES_CATEGORY, {
        lang,
        category: translatedName,
      });

  const isActive =
    translatedName.toLowerCase() === (params.category || "").toLowerCase();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") navigate(categoryPath);
  };

  return (
    <div
      className={classNames(styles.card, isActive && styles.active, className)}
      onClick={() => navigate(categoryPath)}
      role="button"
      tabIndex={0}
      aria-label={t("alt.categoryImage", { categoryName: translatedName })}
      onKeyDown={handleKeyDown}
    >
      <UrlIcon
        src={category.url}
        alt={t("alt.categoryImage", { categoryName: translatedName })}
      />
      <p className={styles.name}>{translatedName}</p>
    </div>
  );
};

export default CategoryCard;
