import styles from "./BookingCard.module.scss";
import { MdOutlinePersonOutline } from "react-icons/md";
import { HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";
import { FaRegCalendar } from "react-icons/fa";
import { IBooking } from "./types.ts";
import { useServicePath } from "../service/hooks";
import Button from "../common/Button.tsx";
import ResponsiveImage from "../common/ResponsiveImage";
import { useDeleteBooking } from "./hooks.ts";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

interface BookingCardProps {
  booking: IBooking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { t, i18n } = useTranslation();
  const { _id, serviceId, date, time, status, translations } = booking;
  const { mutate: deleteBooking } = useDeleteBooking();
  const navigateToService = useServicePath();
  const { enqueueSnackbar } = useSnackbar();

  const service =
    typeof serviceId === "object" && serviceId !== null ? serviceId : null;
  const resolvedServiceId =
    typeof serviceId === "string" ? serviceId : serviceId?._id;

  const translatedStatus = translations?.status?.[i18n.language] || status;

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
          <ResponsiveImage
            className={styles.image}
            src={service.imageUrls?.[0]}
            alt={t("alt.serviceImage", {
              serviceName:
                service.translations?.name?.[i18n.language] ||
                service.name ||
                "",
            })}
          />
          <section className={styles.details}>
            <h2 className={styles.serviceName}>
              {service.translations.name[i18n.language]}
            </h2>{" "}
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
                  {date
                    ? new Date(date).toLocaleDateString(i18n.language)
                    : t("common.na")}
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
            {!["Completed", "Užbaigti", "Завершено"].includes(
              translatedStatus
            ) && (
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
