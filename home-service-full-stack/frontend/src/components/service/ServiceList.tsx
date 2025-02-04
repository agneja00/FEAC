import styles from "./ServiceList.module.scss";
import classNames from "classnames";
import ServiceCard from "./ServiceCard";
import { Category } from "../category/types";
import { useServices } from "./hooks";
import { Service } from "./types";

interface ServiceListProps {
  categoryName?: Category["name"];
  className?: string;
  services?: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({
  categoryName,
  className,
  services,
}) => {
  const { data } = useServices();
  const allServices = data ?? [];

  const filteredService =
    services ??
    (categoryName
      ? allServices.filter((service) => service.category === categoryName)
      : allServices);

  return (
    <div className={classNames(styles.container, className)}>
      {filteredService.map((service) => (
        <ServiceCard key={service._id} service={service} isFavorite={false} />
      ))}
    </div>
  );
};

export default ServiceList;
