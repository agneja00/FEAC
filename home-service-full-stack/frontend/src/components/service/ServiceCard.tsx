import { Service } from "@/components/service/types";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Button from "../common/Button";
import styles from "./ServiceCard.module.scss";
import { useToggleFavorite } from "@/components/service/hooks";

interface ServiceCardProps {
  service: Service;
  email: string;
  isFavorite: boolean;
}

const ServiceCard = ({ service, email, isFavorite }: ServiceCardProps) => {
  const { _id } = service;
  const { mutate: toggleFavorite } = useToggleFavorite();

  const handleToggleFavorite = () => {
    toggleFavorite({ email, serviceId: _id });
  };

  return (
    <div className={styles.card}>
      {service.imageUrls?.length > 0 && (
        <img
          src={service.imageUrls[0]}
          alt={service.name}
          className={styles.image}
        />
      )}
      <div className={styles.infoContainer}>
        <span className={styles.chip}>{service.category}</span>
        <h3 className={styles.name}>{service.name}</h3>
        <p className={styles.contactPerson}>{service.contactPerson}</p>
        <p className={styles.address}>{service.address}</p>
        <div className={styles.buttonContainer}>
          <Button small>Book now</Button>
          <Button favorite onClick={handleToggleFavorite}>
            {isFavorite ? (
              <FaHeart fontSize={14} />
            ) : (
              <FaRegHeart fontSize={14} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
