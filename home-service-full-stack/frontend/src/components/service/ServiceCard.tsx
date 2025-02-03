import { useNavigate, generatePath } from "react-router-dom";
import { useState, useEffect } from "react";
import { Service } from "@/components/service/types";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Button from "../common/Button";
import styles from "./ServiceCard.module.scss";
import { ROUTES } from "@/constants/routes";
import { useToggleFavorite } from "./hooks";

interface ServiceCardProps {
  service: Service;
  email: string;
  isFavorite?: boolean;
}

const ServiceCard = ({
  service,
  email,
  isFavorite = false,
}: ServiceCardProps) => {
  if (!service) return null;

  const { _id, name, category, contactPerson, address, imageUrls } = service;
  const navigate = useNavigate();
  const { mutate, isPending } = useToggleFavorite();
  const servicePath = generatePath(ROUTES.SERVICE_ID, { id: _id });

  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);

  useEffect(() => {
    setLocalIsFavorite(isFavorite);
  }, [isFavorite]);

  const handleToggleFavorite = () => {
    const previousIsFavorite = localIsFavorite;
    setLocalIsFavorite(!previousIsFavorite);

    mutate(
      { email, serviceId: _id },
      {
        onError: () => setLocalIsFavorite(previousIsFavorite),
      },
    );
  };

  return (
    <div className={styles.card}>
      {imageUrls?.length > 0 && (
        <img src={imageUrls[0]} alt={name} className={styles.image} />
      )}
      <div className={styles.infoContainer}>
        <span className={styles.chip}>{category}</span>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.contactPerson}>{contactPerson}</p>
        <p className={styles.address}>{address}</p>
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
