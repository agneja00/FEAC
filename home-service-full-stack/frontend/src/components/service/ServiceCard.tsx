import { useState, useEffect, useContext } from "react";
import { Service } from "@/components/service/types";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Button from "../common/Button";
import styles from "./ServiceCard.module.scss";
import { useToggleFavorite } from "./hooks";
import { UserContext } from "../context/UserContext";
import { useServicePath } from "./hooks";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  service: Service;
  isFavorite?: boolean;
}

const ServiceCard = ({ service, isFavorite = false }: ServiceCardProps) => {
  const { t } = useTranslation();
  if (!service || !service._id) return null;

  const { _id, name, category, contactPerson, address, imageUrls } = service;
  const { user } = useContext(UserContext);
  const email = user?.email;
  const { mutate, isPending } = useToggleFavorite();
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);
  const navigateToService = useServicePath();

  useEffect(() => {
    setLocalIsFavorite(isFavorite);
  }, [isFavorite]);

  const handleToggleFavorite = () => {
    if (!_id || !email) return;
    const previousIsFavorite = localIsFavorite;
    setLocalIsFavorite(!previousIsFavorite);

    mutate(
      { email: user.email, serviceId: _id },
      {
        onError: (error) => {
          setLocalIsFavorite(previousIsFavorite);
        },
        onSuccess: (data) => {
          setLocalIsFavorite(data?.favoritedBy?.includes(email));
        },
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
          <Button small onClick={() => navigateToService(_id)}>
            {t("buttons.bookNow")}
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
