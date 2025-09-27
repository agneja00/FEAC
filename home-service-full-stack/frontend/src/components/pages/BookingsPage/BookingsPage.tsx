import { useParams, useNavigate, generatePath } from "react-router-dom";
import FilteredList from "@/components/common/FilteredList";
import BookingCard from "@/components/booking/BookingCard";
import { useUserBookings } from "@/components/booking/hooks";
import { TBookingStatus } from "@/components/booking/types";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "react-i18next";
import PageTitle from "@/components/common/PageTitle";

const statusTranslations: Record<string, Record<string, string>> = {
  en: { Confirmed: "Confirmed", Completed: "Completed" },
  lt: { Confirmed: "Patvirtinta", Completed: "Užbaigta" },
  ru: { Confirmed: "Подтверждено", Completed: "Завершено" },
};

const BookingsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    lang = "en",
    email,
    status,
  } = useParams<{ lang: string; email: string; status: string }>();

  const getEnglishStatus = () =>
    Object.keys(statusTranslations.en).find(
      (key) => statusTranslations[lang]?.[key] === status,
    ) || "Confirmed";

  const validatedStatus = getEnglishStatus() as TBookingStatus;
  const { data: bookings, isLoading, error } = useUserBookings(validatedStatus);

  const handleFilterChange = (filter: string) => {
    const translatedStatus =
      statusTranslations[lang][filter as TBookingStatus] || filter;
    navigate(
      generatePath(ROUTES.BOOKINGS_FILTER, {
        lang,
        email,
        status: translatedStatus,
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

  return (
    <>
      <PageTitle title="My bookings" />
      <FilteredList
        title={t("accountModal.myBookings")}
        items={bookings || []}
        filters={Object.keys(statusTranslations[lang]) as TBookingStatus[]}
        activeFilter={validatedStatus}
        onFilterChange={handleFilterChange}
        filterLabels={statusTranslations[lang]}
        renderItem={(booking) => (
          <BookingCard key={booking._id} booking={booking} />
        )}
      />
    </>
  );
};

export default BookingsPage;
