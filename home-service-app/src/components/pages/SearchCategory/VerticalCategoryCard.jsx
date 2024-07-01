import PropTypes from "prop-types";
import { useNavigate, generatePath, useParams } from "react-router-dom";
import classNames from "classnames";
import UrlIcon from "../../common/UrlIcon";
import { ROUTES } from "@/constants/routes";
import styles from "./VerticalCategoryCard.module.scss";

const VerticalCategoryCard = ({ category }) => {
  const params = useParams();
  const { name } = category;
  const navigate = useNavigate();

  const categoryPath = generatePath(ROUTES.SEARCH_CATEGORY, { category: name });
  const activeCategory = params.category;

  return (
    <div
      className={classNames(
        styles.card,
        activeCategory === name && styles.active
      )}
      onClick={() => navigate(categoryPath)}
    >
      <UrlIcon src={category.url} alt={`icon ${category.name}`} />
      <p className={styles.name}>{name}</p>
    </div>
  );
};

VerticalCategoryCard.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default VerticalCategoryCard;
