import styles from "./BookingsPage.module.scss";
import Button from "@/components/common/Button";
import BookingList from "@/components/booking/BookingList";
import { useState } from "react";
import { BookingStatus } from "@/components/booking/types";
import classNames from "classnames";

const BookingsPage = () => {
  const [status, setStatus] = useState<BookingStatus>("confirmed");
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Bookings</h1>
      <div className={styles.buttonsContainer}>
        <Button
          className={classNames(styles.button, {
            [styles.active]: status === "confirmed",
          })}
          onClick={() => setStatus("confirmed")}
        >
          Booked
        </Button>
        <Button
          className={classNames(styles.button, {
            [styles.active]: status === "completed",
          })}
          onClick={() => setStatus("completed")}
        >
          Completed
        </Button>
      </div>
      <div className={styles.bookingsContainer}>
        <BookingList />
      </div>
    </div>
  );
};

export default BookingsPage;
