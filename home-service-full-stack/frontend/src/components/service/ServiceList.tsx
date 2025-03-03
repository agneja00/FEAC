import styles from "./ServiceList.module.scss";
import { ServiceWithFavorite } from "./types";
import ServiceCard from "./ServiceCard";
import classNames from "classnames";

interface ServiceListProps {
  services: ServiceWithFavorite[];
  favoriteServices?: ServiceWithFavorite[];
  className?: string;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, className }) => {
  return (
    <div className={classNames(styles.container, className)}>
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
          isFavorite={service.isFavorite}
        />
      ))}
    </div>
  );
};

export default ServiceList;
