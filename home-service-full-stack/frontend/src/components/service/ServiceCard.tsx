import { Service } from "@/components/service/types";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Button from "../common/Button";
import styles from "./ServiceCard.module.scss";
import { useNavigate, generatePath } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { toggleFavorite } from "./api";

interface ServiceCardProps {
  service: Service;
  email: string;
}

const ServiceCard = ({ service, email }: ServiceCardProps) => {
  const { _id } = service;
  const navigate = useNavigate();
  const servicePath = generatePath(ROUTES.SERVICE_ID, { id: _id });

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
          <Button small onClick={() => navigate(servicePath)}>
            Book now
          </Button>
          <Button
            favorite
            onClick={() => toggleFavorite}
            aria-label={
              service.favoritedBy.includes(email)
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            {service.favoritedBy.includes(email) ? (
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
