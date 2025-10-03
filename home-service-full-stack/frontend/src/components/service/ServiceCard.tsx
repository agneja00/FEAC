import { useState, useEffect, useContext } from "react";
import { IService } from "@/components/service/types";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Button from "../common/Button";
import styles from "./ServiceCard.module.scss";
import { useToggleFavorite } from "./hooks";
import { UserContext } from "../context/UserContext";
import { useServicePath } from "./hooks";
import { useTranslation } from "react-i18next";
import ResponsiveImage from "../common/ResponsiveImage";

interface ServiceCardProps {
  service?: IService | null;
  isFavorite?: boolean;
}

const ServiceCard = ({ service, isFavorite = false }: ServiceCardProps) => {
  const { t, i18n } = useTranslation();
  const { user } = useContext(UserContext);
  const email = user?.email;
  const { mutate, isPending } = useToggleFavorite();
  const navigateToService = useServicePath();

  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);

  useEffect(() => {
    if (isFavorite !== localIsFavorite) {
      setLocalIsFavorite(isFavorite);
    }
  }, [isFavorite]);

  if (!service || !service._id) return null;
  const { _id, contactPerson, address, imageUrls } = service;
  const language = i18n.language || "en";

  const name = service.translations?.name?.[language] || service.name;
  const rawCategory = service.translations?.category?.[language];
  const category =
    rawCategory && rawCategory.trim() !== ""
      ? rawCategory
      : t(`categories.${(service.category || "").toLowerCase()}`);

  const handleToggleFavorite = () => {
    if (!_id || !email) return;
    const previousIsFavorite = localIsFavorite;
    setLocalIsFavorite(!previousIsFavorite);

    mutate(
      {
        email,
        serviceId: _id,
        lang: language,
      },
      {
        onError: () => {
          setLocalIsFavorite(previousIsFavorite);
        },
      }
    );
  };

  return (
    <div className={styles.card}>
      {imageUrls?.[0] && (
        <ResponsiveImage
          src={imageUrls[0]}
          alt={t("alt.serviceImage", { serviceName: name })}
          className={styles.image}
        />
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
              localIsFavorite
                ? t("alt.removeFavorite", { serviceName: name })
                : t("alt.addFavorite", { serviceName: name })
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
