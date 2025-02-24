import styles from "./BookingCard.module.scss";
import { MdOutlinePersonOutline } from "react-icons/md";
import { HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";
import { FaRegCalendar } from "react-icons/fa";
import { Booking } from "./types.ts";
import { useServicePath } from "../service/hooks";
import Button from "../common/Button.tsx";
import { useDeleteBooking } from "./hooks.ts";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { t } = useTranslation();
  const { _id, serviceId, date, time, status } = booking;
  const { mutate: deleteBooking } = useDeleteBooking();
  const navigateToService = useServicePath();
  const { enqueueSnackbar } = useSnackbar();

  const service = typeof serviceId === "string" ? null : serviceId;
  const resolvedServiceId =
    typeof serviceId === "string" ? serviceId : serviceId?._id;

  const handleCancelBooking = () => {
    deleteBooking(_id);
    enqueueSnackbar(t("messages.bookCancel"), { variant: "success" });
  };

  return (
    <div
      className={styles.cardContainer}
      onClick={() => {
        if (resolvedServiceId) {
          navigateToService(resolvedServiceId);
        }
      }}
    >
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
                {t("bookingCard.date")}
                <span className={styles.dateAndTime}>
                  {date ? new Date(date).toLocaleDateString() : "N/A"}
                </span>
              </p>
            </div>
            <div className={styles.info}>
              <HiOutlineClock className={styles.icon} fontSize={24} />
              <p className={styles.service}>
                {t("bookingCard.time")}
                <span className={styles.dateAndTime}>{time}</span>
              </p>
            </div>
            {status !== "Completed" && (
              <Button
                small
                cancel
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelBooking();
                }}
              >
                {t("buttons.cancel")}
              </Button>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default BookingCard;
