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
    t("time.8AM"),
    t("time.10AM"),
    t("time.11AM"),
    t("time.1130AM"),
    t("time.12PM"),
    t("time.1230PM"),
    t("time.2PM"),
    t("time.6PM"),
    t("time.7PM"),
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

      const booking: NewBooking = {
        serviceId: currentService._id,
        date: dateValue ? new Date(dateValue.format("YYYY-MM-DD")) : null,
        time: timeSlot,
        userEmail: user.email,
        userName: user.name,
        status: "Confirmed",
        translations: {
          status: {
            en: "Confirmed",
            lt: "Patvirtinti",
            ru: "Подтверждено",
          },
        },
      };
      await postBooking(booking);
      enqueueSnackbar(t("messages.bookSuccess"), { variant: "success" });
      handleCloseModal();
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : t("messages.bookSuccess"),
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
            {timeSlots.map((time) => (
              <button
                key={time}
                className={styles.time}
                onClick={() => handleTimeChange(time)}
              >
                {time}
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
