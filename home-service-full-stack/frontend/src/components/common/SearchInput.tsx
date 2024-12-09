import styles from "./SearchInput.module.scss";

interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = ({ ...props }: SearchInputProps) => {
  return (
    <input
      className={styles.searchInput}
      placeholder="Search service by name..."
      {...props}
    />
  );
};

export default SearchInput;
