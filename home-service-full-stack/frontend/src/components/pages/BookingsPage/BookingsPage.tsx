import { useEffect } from "react";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import FilteredList from "@/components/common/FilteredList";
import BookingCard from "@/components/booking/BookingCard";
import { useUserBookings } from "@/components/booking/hooks";
import { BookingStatus } from "@/components/booking/types";
import { ROUTES } from "@/constants/routes";

const statuses: BookingStatus[] = ["Confirmed", "Completed"];

const BookingsPage = () => {
  const { email, status } = useParams<{
    email: string;
    status: BookingStatus;
  }>();
  const navigate = useNavigate();
  const { data: bookings } = useUserBookings(status as BookingStatus);

  const handleFilterChange = (filter: string) => {
    if (email) {
      const newPath = generatePath(ROUTES.BOOKINGS_FILTER, {
        email,
        status: filter,
      });
      navigate(newPath);
    }
  };

  return (
    <FilteredList
      title="My Bookings"
      items={bookings || []}
      filters={statuses}
      activeFilter={status || "Confirmed"}
      onFilterChange={handleFilterChange}
      renderItem={(booking) => (
        <BookingCard key={booking._id} booking={booking} />
      )}
    />
  );
};

export default BookingsPage;
