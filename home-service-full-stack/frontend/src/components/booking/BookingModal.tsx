import styles from "./BookingModal.module.scss";
import { useContext, useState } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { IoCloseOutline } from "react-icons/io5";
import Button from "../common/Button";
import { useAddBooking } from "./hooks";
import { UserContext } from "../context/UserContext";
import { NewBooking } from "./types";
import useCurrentBusiness from "../business/hooks";

interface BookingModalProps {
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ onClose }) => {
  const { currentBusiness } = useCurrentBusiness();
  const { user } = useContext(UserContext);
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
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  return (
    <div className={styles.bookModal}>
      <article className={styles.bookContainer}>
        <IoCloseOutline
          className={styles.close}
          fontSize={30}
          onClick={onClose}
        />
        <h3 className={styles.title}>Book an Service</h3>
        <p>Select Date and Time slot to book an service</p>

        <h4 className={styles.subtitle}>Select Date</h4>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={dateValue} onChange={handleDateChange} />
        </LocalizationProvider>
        <div className={styles.timeContainer}>
          {timeSlots.map((time, i) => (
            <button
              key={i}
              className={styles.time}
              value={time}
              onClick={() => handleTimeChange(time)}
            >
              {time}
            </button>
          ))}
        </div>
        <Button onClick={handleSubmit}>Reserve Time</Button>
      </article>
    </div>
  );
};

export default BookingModal;
