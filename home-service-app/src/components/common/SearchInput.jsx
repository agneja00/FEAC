import PropTypes from "prop-types";
import styles from "./SearchInput.module.scss";

const SearchInput = ({ value, onChange, ...props }) => {
  return (
    <input
      className={styles.searchInput}
      placeholder="Search"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
