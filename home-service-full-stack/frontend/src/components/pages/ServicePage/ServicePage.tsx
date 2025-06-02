import styles from "./ServicePage.module.scss";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ServicesAndBookingsLayout from "@/components/layout/ServicesAndBookingsLayout";
import Button from "@/components/common/Button";
import { GiNotebook } from "react-icons/gi";
import ServiceInfoHeader from "@/components/service/ServiceInfoHeader";
import ServiceInfoSection from "@/components/service/ServiceInfoSection";
import SimilarService from "@/components/service/SimilarService";
import Modal from "@/components/common/Modal";
import { UserContext } from "@/components/context/UserContext";
import { useCurrentService } from "@/components/service/hooks";
import { useAddBooking } from "@/components/booking/hooks";
import { NewBooking } from "@/components/booking/types";
import { Dayjs } from "dayjs";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const ServicePage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [bookOpen, setBookOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const { currentService } = useCurrentService();
  const { mutateAsync: postBooking } = useAddBooking();

  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [timeSlot, setTimeSlot] = useState("");

  const timeSlots = [
    { value: "08:00", label: t("time.8AM") },
    { value: "10:00", label: t("time.10AM") },
    { value: "11:00", label: t("time.11AM") },
    { value: "11:30", label: t("time.1130AM") },
    { value: "12:00", label: t("time.12PM") },
    { value: "12:30", label: t("time.1230PM") },
    { value: "14:00", label: t("time.2PM") },
    { value: "18:00", label: t("time.6PM") },
    { value: "19:00", label: t("time.7PM") },
  ];

  const handleDateChange = (newValue: Dayjs | null) => {
    setDateValue(newValue);
  };

  const handleTimeChange = (time: string) => {
    setTimeSlot(time);
  };

  const handleOpenModal = () => setBookOpen(true);
  const handleCloseModal = () => setBookOpen(false);

  const handleSubmit = async () => {
    try {
      if (!currentService || !user) return;

      if (!dateValue || !timeSlot) {
        enqueueSnackbar(t("messages.selectBookingDate"), {
          variant: "error",
        });
        return;
      }

      const [hours, minutes] = timeSlot.split(":").map(Number);
      const bookingDateTime = new Date(
        dateValue.year(),
        dateValue.month(),
        dateValue.date(),
        hours,
        minutes,
      );

      const now = new Date();

      if (bookingDateTime < now) {
        enqueueSnackbar(t("messages.pastDateError"), { variant: "error" });
        return;
      }

      const booking: NewBooking = {
        serviceId: currentService._id,
        date: new Date(dateValue.format("YYYY-MM-DD")),
        time: timeSlot,
        userEmail: user.email,
        userName: user.name,
        status: "Confirmed",
        translations: {
          status: {
            en: "Confirmed",
            lt: "Patvirtinta",
            ru: "Подтверждено",
          },
        },
      };

      await postBooking(booking);
      enqueueSnackbar(t("messages.bookSuccess"), { variant: "success" });
      handleCloseModal();
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : t("messages.bookError"),
        { variant: "error" },
      );
    }
  };

  if (!id) return null;

  return (
    <>
      {bookOpen && (
        <Modal onClose={handleCloseModal} isOpen={true}>
          <h3 className={styles.title}>{t("forms.book.title")}</h3>
          <p>{t("forms.book.action")}</p>
          <h4 className={styles.subtitle}>{t("forms.book.select")}</h4>
          <div className={styles.calendar}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar value={dateValue} onChange={handleDateChange} />
            </LocalizationProvider>
          </div>
          <div className={styles.timeContainer}>
            {timeSlots.map(({ value, label }) => (
              <button
                key={value}
                className={styles.time}
                onClick={() => handleTimeChange(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <Button onClick={handleSubmit}>{t("buttons.reserveTime")}</Button>
        </Modal>
      )}
      <ServicesAndBookingsLayout>
        <ServiceInfoHeader />
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <ServiceInfoSection />
          </div>
          <div>
            <div className={styles.buttonContainer}>
              {!user ? (
                <Button
                  disabled
                  className={styles.button}
                  onClick={handleOpenModal}
                >
                  <GiNotebook fontSize={20} />
                  <span>{t("buttons.bookAppointment")}</span>
                </Button>
              ) : (
                <Button className={styles.button} onClick={handleOpenModal}>
                  <GiNotebook fontSize={20} />
                  <span>{t("buttons.bookAppointment")}</span>
                </Button>
              )}
            </div>
            <SimilarService />
          </div>
        </div>
      </ServicesAndBookingsLayout>
    </>
  );
};

export default ServicePage;
