import BookingCard from "./BookingCard";
import { useState } from "react";
import { useUserBookings } from "./hooks";
import { BookingStatus, Booking } from "./types";

const BookingList: React.FC = () => {
  const [status, setStatus] = useState<BookingStatus>("confirmed");

  const { data: bookings } = useUserBookings(status);
  const businessBookings: Booking[] = bookings ?? [];

  return (
    <>
      {businessBookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </>
  );
};
export default BookingList;
