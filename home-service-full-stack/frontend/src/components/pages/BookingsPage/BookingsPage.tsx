import { useParams, useNavigate, generatePath } from "react-router-dom";
import FilteredList from "@/components/common/FilteredList";
import BookingCard from "@/components/booking/BookingCard";
import { useUserBookings } from "@/components/booking/hooks";
import { BookingStatus } from "@/components/booking/types";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "react-i18next";

const statuses: BookingStatus[] = ["Confirmed", "Completed"];

const BookingsPage = () => {
  const { t } = useTranslation();
  const { email, status } = useParams<{
    email: string;
    status: string;
  }>();
  const navigate = useNavigate();

  const validatedStatus: BookingStatus = statuses.includes(
    status as BookingStatus,
  )
    ? (status as BookingStatus)
    : "Confirmed";

  const { data: bookings } = useUserBookings(validatedStatus);

  const statusTranslations: Record<BookingStatus, string> = {
    Confirmed: t("status.confirmed"),
    Completed: t("status.completed"),
  };

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
      title={t("accountModal.myBookings")}
      items={bookings || []}
      filters={statuses}
      activeFilter={validatedStatus}
      onFilterChange={handleFilterChange}
      renderItem={(booking) => (
        <BookingCard key={booking._id} booking={booking} />
      )}
      filterLabels={statusTranslations}
    />
  );
};

export default BookingsPage;
