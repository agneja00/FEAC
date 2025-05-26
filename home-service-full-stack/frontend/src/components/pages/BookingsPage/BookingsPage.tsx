import { useParams, useNavigate, generatePath } from "react-router-dom";
import FilteredList from "@/components/common/FilteredList";
import BookingCard from "@/components/booking/BookingCard";
import { useUserBookings } from "@/components/booking/hooks";
import { TBookingStatus } from "@/components/booking/types";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "react-i18next";

const statusTranslations: Record<string, Record<TBookingStatus, string>> = {
  en: { Confirmed: "Confirmed", Completed: "Completed" },
  lt: { Confirmed: "Patvirtinta", Completed: "Užbaigta" },
  ru: { Confirmed: "Подтверждено", Completed: "Завершено" },
};

const BookingsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const params = useParams<{
    lang?: string;
    email?: string;
    status?: string;
  }>();

  const lang = params.lang ?? "en";
  const email = params.email ?? "";
  const statusFromUrl = params.status ?? statusTranslations[lang].Confirmed;

  const getEnglishStatus = (): TBookingStatus => {
    const langMap = statusTranslations[lang] || statusTranslations["en"];
    const match = Object.entries(langMap).find(
      ([, val]) => val === statusFromUrl,
    );
    return (match?.[0] as TBookingStatus) || "Confirmed";
  };

  const validatedStatus = getEnglishStatus();

  const { data: bookings, isLoading, error } = useUserBookings();

  const handleFilterChange = (filter: string) => {
    const translated =
      statusTranslations[lang]?.[filter as TBookingStatus] || filter;

    navigate(
      generatePath(ROUTES.BOOKINGS_FILTER, {
        lang,
        email,
        status: translated,
      }),
    );
  };

  if (isLoading) return <div>{t("common.loading")}</div>;
  if (error)
    return (
      <div>
        {t("common.error")}: {error.message}
      </div>
    );

  const filteredBookings = bookings || [];

  return (
    <FilteredList
      title={t("accountModal.myBookings")}
      items={filteredBookings}
      filters={Object.keys(statusTranslations[lang]) as TBookingStatus[]}
      activeFilter={validatedStatus}
      onFilterChange={handleFilterChange}
      filterLabels={statusTranslations[lang]}
      renderItem={(booking) => (
        <BookingCard key={booking._id} booking={booking} />
      )}
    />
  );
};

export default BookingsPage;
