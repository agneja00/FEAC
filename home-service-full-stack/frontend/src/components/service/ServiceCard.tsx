import { useNavigate, generatePath } from "react-router-dom";
import { useState, useEffect } from "react";
import { Service } from "@/components/service/types";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Button from "../common/Button";
import styles from "./ServiceCard.module.scss";
import { ROUTES } from "@/constants/routes";
import { useToggleFavorite } from "./hooks";

interface ServiceCardProps {
  service?: Service;
  email: string;
  isFavorite: boolean;
}

const ServiceCard = ({ service, email, isFavorite }: ServiceCardProps) => {
  if (!service) {
    return null;
  }

  const { _id } = service;
  const navigate = useNavigate();
  const { mutate, isPending } = useToggleFavorite();
  const servicePath = generatePath(ROUTES.SERVICE_ID, { id: _id });

  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);

  useEffect(() => {
    setLocalIsFavorite(isFavorite);
  }, [isFavorite]);

  const handleToggleFavorite = () => {
    setLocalIsFavorite((prev) => !prev);
    mutate(
      { email, serviceId: _id },
      {
        onError: () => setLocalIsFavorite((prev) => !prev),
      },
    );
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
          <Button small onClick={() => navigate(servicePath)}>
            Book now
          </Button>
          <Button
            favorite
            onClick={handleToggleFavorite}
            disabled={isPending}
            aria-label={
              localIsFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {localIsFavorite ? (
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
