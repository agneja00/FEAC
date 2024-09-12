import styles from "./BusinessCard.module.scss";
import Button from "../common/Button";
import { Business } from "./types";
import { ROUTES } from "@/constants/routes";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate, generatePath } from "react-router-dom";

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  const { _id } = business;
  const navigate = useNavigate();
  const businessPath = generatePath(ROUTES.BUSINESS_ID, { id: _id });

  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("bookmarks", []);

  const toggleFavorite = () => {
    const index = bookmarks.indexOf(_id);

    if (index !== -1) {
      const newBookmarks = bookmarks.filter((id) => id !== _id);
      setBookmarks(newBookmarks);
    } else {
      setBookmarks([...bookmarks, _id]);
    }
  };

  return (
    <div className={styles.card}>
      {business.imageUrls.length && (
        <img
          src={business.imageUrls[0]}
          alt={business.name}
          className={styles.image}
        />
      )}
      <div className={styles.infoContainer}>
        <span className={styles.chip}>{business.category}</span>
        <h3 className={styles.name}>{business.name}</h3>
        <p className={styles.contactPerson}>{business.contactPerson}</p>
        <p className={styles.address}>{business.address}</p>
        <div className={styles.buttonContainer}>
          <Button onClick={() => navigate(businessPath)}>Book now</Button>
          <Button onClick={toggleFavorite} favorite>
            {bookmarks.includes(_id) ? (
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

export default BusinessCard;
