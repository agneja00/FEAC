import styles from "./BusinessList.module.scss";
import classNames from "classnames";
import BusinessCard from "./BusinessCard";
import { Category } from "../category/types";
import { useBusinesses } from "./hooks";

interface BusinessListProps {
  categoryName?: Category["name"];
  className?: string;
}

const BusinessList: React.FC<BusinessListProps> = ({
  categoryName,
  className,
}) => {
  const { data } = useBusinesses();
  const businesses = data ?? [];

  const filteredBusiness = categoryName
    ? businesses.filter((business) => business.category === categoryName)
    : businesses;

  return (
    <div className={classNames(styles.container, className)}>
      {filteredBusiness.map((business) => (
        <BusinessCard key={business._id} business={business} />
      ))}
    </div>
  );
};

export default BusinessList;
