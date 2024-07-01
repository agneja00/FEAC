import styles from "./SearchInput.module.scss";
import { useState } from "react";

const SearchInput = ({ ...props }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      className={styles.searchInput}
      placeholder="Search"
      value={value}
      {...props}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
