import styles from "./BusinessList.module.scss";
import classNames from "classnames";
import BusinessCard from "./BusinessCard";
import { Category } from "../category/types";
import { useBusinesses } from "./hooks";
import { Business } from "./types";

interface BusinessListProps {
  categoryName?: Category["name"];
  className?: string;
  businesses?: Business[];
}

const BusinessList: React.FC<BusinessListProps> = ({
  categoryName,
  className,
  businesses,
}) => {
  const { data } = useBusinesses();
  const allBusinesses = data ?? [];

  const filteredBusiness =
    businesses ??
    (categoryName
      ? allBusinesses.filter((business) => business.category === categoryName)
      : allBusinesses);

  return (
    <div className={classNames(styles.container, className)}>
      {filteredBusiness.map((business) => (
        <BusinessCard key={business._id} business={business} />
      ))}
    </div>
  );
};

export default BusinessList;
