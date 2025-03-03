import axiosInstance from "@/config/axios";
import { Booking, BookingStatus, NewBooking } from "./types";
import { fetchServiceById } from "../service/api";

const statusTranslations: Record<string, Record<BookingStatus, string>> = {
  en: { Confirmed: "Confirmed", Completed: "Completed" },
  lt: { Confirmed: "Patvirtinti", Completed: "Užbaigti" },
};

export const fetchUserBookings = async (
  lang: string,
  userEmail: string,
  status: BookingStatus,
): Promise<Booking[]> => {
  const translatedStatus = statusTranslations[lang]?.[status] || status;

  const response = await axiosInstance.get<Booking[]>(
    `/${lang}/bookings/user/${userEmail}/${translatedStatus}`,
  );

  const bookings = response.data;

  const bookingsWithService = await Promise.all(
    bookings.map(async (booking) => {
      if (typeof booking.serviceId === "string") {
        const service = await fetchServiceById(lang, booking.serviceId);
        return { ...booking, serviceId: service };
      }
      return booking;
    }),
  );

  return bookingsWithService;
};

export const createBooking = async (
  lang: string,
  booking: NewBooking,
): Promise<Booking> => {
  const response = await axiosInstance.post<Booking>(
    `/${lang}/bookings`,
    booking,
  );
  return response.data;
};

export const deleteBooking = async (
  lang: string,
  id: string,
): Promise<void> => {
  await axiosInstance.delete<void>(`/${lang}/bookings/${id}`);
};
