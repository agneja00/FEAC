import styles from "./FilteredBusinessList.module.scss";
import Button from "@/components/common/Button";
import classNames from "classnames";

interface FilteredBusinessListProps<T> {
  title: string;
  items: T[];
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  renderItem: (item: T) => React.ReactNode;
}

const FilteredBusinessList = <T,>({
  title,
  items,
  filters,
  activeFilter,
  onFilterChange,
  renderItem,
}: FilteredBusinessListProps<T>) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.buttonsContainer}>
        {filters.map((filter) => (
          <Button
            key={filter}
            className={classNames(styles.button, {
              [styles.active]: activeFilter === filter,
            })}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
      <div className={styles.itemsContainer}>
        {items.length > 0 ? (
          items.map((item) => renderItem(item))
        ) : (
          <p className={styles.noItems}>No items to display.</p>
        )}
      </div>
    </div>
  );
};

export default FilteredBusinessList;
