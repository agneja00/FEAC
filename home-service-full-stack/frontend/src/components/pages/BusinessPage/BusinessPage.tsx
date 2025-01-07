import styles from "./BusinessPage.module.scss";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import BusinessesAndBookingsLayout from "@/components/layout/BusinessesAndBookingsLayout";
import Button from "@/components/common/Button";
import { GiNotebook } from "react-icons/gi";
import BusinessInfoHeader from "@/components/business/BusinessInfoHeader";
import BusinessInfoSection from "@/components/business/BusinessInfoSection";
import SimilarBusiness from "@/components/business/SimilarBusiness";
import Modal from "@/components/common/Modal";
import { UserContext } from "@/components/context/UserContext";
import useCurrentBusiness from "@/components/business/hooks";
import { useAddBooking } from "@/components/booking/hooks";
import { NewBooking } from "@/components/booking/types";
import { Dayjs } from "dayjs";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSnackbar } from "notistack";

const BusinessPage = () => {
  const { id } = useParams<{ id: string }>();
  const [bookOpen, setBookOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const { currentBusiness } = useCurrentBusiness();
  const { mutateAsync: postBooking } = useAddBooking();

  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [timeSlot, setTimeSlot] = useState("");

  const timeSlots = [
    "8:00 AM",
    "10:00 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 AM",
    "12:30 AM",
    "14:00 AM",
    "6:00 PM",
    "7:00 PM",
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
      if (!currentBusiness || !user) return;

      const booking: NewBooking = {
        businessId: currentBusiness._id,
        date: dateValue ? new Date(dateValue.format("YYYY-MM-DD")) : null,
        time: timeSlot,
        userEmail: user.email,
        userName: user.name,
        status: "confirmed",
      };
      await postBooking(booking);
      enqueueSnackbar("Successfully booked!", { variant: "success" });
      handleCloseModal();
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : "An error occurred.",
        { variant: "error" },
      );
    }
  };

  if (!id) return null;

  return (
    <>
      {bookOpen && (
        <Modal onClose={handleCloseModal} isOpen={true}>
          <h3 className={styles.title}>Book a Service</h3>
          <p>Select Date and Time slot to book a service</p>
          <h4 className={styles.subtitle}>Select Date</h4>
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
          <Button onClick={handleSubmit}>Reserve Time</Button>
        </Modal>
      )}
      <BusinessesAndBookingsLayout>
        <BusinessInfoHeader />
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <BusinessInfoSection />
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
                  <span>Book Appointment</span>
                </Button>
              ) : (
                <Button className={styles.button} onClick={handleOpenModal}>
                  <GiNotebook fontSize={20} />
                  <span>Book Appointment</span>
                </Button>
              )}
            </div>
            <SimilarBusiness />
          </div>
        </div>
      </BusinessesAndBookingsLayout>
    </>
  );
};

export default BusinessPage;
