import styles from "./BookingCard.module.scss";
import { MdOutlinePersonOutline } from "react-icons/md";
import { HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";
import { FaRegCalendar } from "react-icons/fa";
import { Booking } from "./types.ts";

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { serviceId, date, time } = booking;

  const service = typeof serviceId === "string" ? null : serviceId;

  return (
    <div className={styles.cardContainer}>
      {service && (
        <>
          <img
            className={styles.image}
            src={service.imageUrls?.[0]}
            alt="logo"
          />
          <section className={styles.details}>
            <h2 className={styles.serviceName}>{service.category}</h2>
            <div className={styles.info}>
              <MdOutlinePersonOutline className={styles.icon} fontSize={24} />
              <p className={styles.infoDetails}>
                <span className={styles.contactPerson}>
                  {service.contactPerson}
                </span>
              </p>
            </div>
            <div className={styles.info}>
              <HiOutlineLocationMarker className={styles.icon} fontSize={24} />
              <p className={styles.address}>{service.address}</p>
            </div>
            <div className={styles.info}>
              <FaRegCalendar className={styles.icon} fontSize={22} />
              <p className={styles.service}>
                Service on:
                <span className={styles.dateAndTime}>
                  {date ? new Date(date).toLocaleDateString() : "N/A"}
                </span>
              </p>
            </div>
            <div className={styles.info}>
              <HiOutlineClock className={styles.icon} fontSize={24} />
              <p className={styles.service}>
                Service at:
                <span className={styles.dateAndTime}>{time}</span>
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default BookingCard;
