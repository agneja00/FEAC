import styles from "./ServiceList.module.scss";
import classNames from "classnames";
import ServiceCard from "./ServiceCard";
import { Service } from "./types";

interface ServiceListProps {
  className?: string;
  services?: Service[];
  favoriteServices?: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({
  className,
  services,
  favoriteServices,
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      {services?.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
          isFavorite={favoriteServices?.some((fav) => fav._id === service._id)}
        />
      ))}
    </div>
  );
};

export default ServiceList;
