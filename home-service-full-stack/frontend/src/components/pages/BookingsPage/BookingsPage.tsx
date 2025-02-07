import FilteredList from "@/components/common/FilteredList";
import BookingCard from "@/components/booking/BookingCard";
import { useState } from "react";
import { useUserBookings } from "@/components/booking/hooks";
import { BookingStatus, Booking } from "@/components/booking/types";

const BookingsPage = () => {
  const [status, setStatus] = useState<BookingStatus>("Confirmed");

  const { data: bookings } = useUserBookings("Confirmed");
  const filteredBookings = bookings
    ? bookings.filter((booking) => booking.status === status)
    : [];

  const statuses: BookingStatus[] = ["Confirmed", "Completed"];

  return (
    <FilteredList
      title="My Bookings"
      items={filteredBookings}
      filters={statuses}
      activeFilter={status}
      onFilterChange={(filter: string) => setStatus(filter as BookingStatus)}
      renderItem={(booking) => (
        <BookingCard key={booking._id} booking={booking} />
      )}
    />
  );
};

export default BookingsPage;
