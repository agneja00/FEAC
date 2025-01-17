import FilteredBusinessList from "@/components/common/FilteredBusinessList";
import BookingCard from "@/components/booking/BookingCard";
import { useState } from "react";
import { useUserBookings } from "@/components/booking/hooks";
import { BookingStatus, Booking } from "@/components/booking/types";

const BookingsPage = () => {
  const [status, setStatus] = useState<BookingStatus>("confirmed");

  const { data: bookings } = useUserBookings(status);
  const businessBookings: Booking[] = bookings ?? [];

  const statuses: BookingStatus[] = ["confirmed", "completed"];

  return (
    <FilteredBusinessList
      title="My Bookings"
      items={businessBookings}
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
