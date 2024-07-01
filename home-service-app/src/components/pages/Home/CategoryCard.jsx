import PropTypes from "prop-types";
import { useNavigate, generatePath } from "react-router-dom";
import styles from "./CategoryCard.module.scss";
import { ROUTES } from "@/constants/routes";
import UrlIcon from "../../common/UrlIcon";

const CategoryCard = ({ category }) => {
  const { name } = category;
  const navigate = useNavigate();

  const categoryPath = generatePath(ROUTES.SEARCH_CATEGORY, { category: name });

  return (
    <div className={styles.card} onClick={() => navigate(categoryPath)}>
      <UrlIcon src={category.url} alt={`icon ${category.name}`} />
      <p className={styles.name}>{name}</p>
    </div>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
