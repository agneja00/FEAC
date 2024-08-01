import BookingCard from "./BookingCard";
import { useState } from "react";
import { useUserBookings } from "./hooks";
import { BookingStatus, BookingWithBusiness } from "./types";

const BookingList: React.FC = () => {
  const [status, setStatus] = useState<BookingStatus>("confirmed");

  const { data: bookings } = useUserBookings(status);
  const bookingsData: BookingWithBusiness[] = bookings ?? [];

  return (
    <>
      {bookingsData.map((booking: BookingWithBusiness) => (
        <BookingCard key={booking._id} bookingsData={booking} />
      ))}
    </>
  );
};
export default BookingList;
