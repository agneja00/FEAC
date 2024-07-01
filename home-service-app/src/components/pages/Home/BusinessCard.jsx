import PropTypes from "prop-types";
import Button from "../../common/Button";
import styles from "./BusinessCard.module.scss";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useLocalStorage } from "usehooks-ts";

const BusinessCard = ({ business }) => {
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", []);

  const toggleFavorite = () => {
    const index = bookmarks.indexOf(business._id);

    if (index !== -1) {
      const newBookmarks = bookmarks.filter((id) => id !== business._id);
      setBookmarks(newBookmarks);
    } else {
      setBookmarks([...bookmarks, business._id]);
    }
  };

  return (
    <div className={styles.card}>
      {business.images.length && (
        <img
          src={business.images[0].url}
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
          <Button>Book now</Button>
          <Button onClick={toggleFavorite} favorite>
            {bookmarks.includes(business._id) ? (
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

BusinessCard.propTypes = {
  business: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    contactPerson: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default BusinessCard;
