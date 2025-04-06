import axiosInstance from "@/config/axios";
import { IBooking, TBookingStatus, NewBooking } from "./types";
import { fetchServiceById } from "../service/api";

const statusTranslations: Record<string, Record<TBookingStatus, string>> = {
  en: { Confirmed: "Confirmed", Completed: "Completed" },
  lt: { Confirmed: "Patvirtinti", Completed: "Užbaigti" },
  ru: { Confirmed: "Подтверждено", Completed: "Завершено" },
};

export const fetchUserBookings = async (
  lang: string,
  userEmail: string,
  status: TBookingStatus,
): Promise<IBooking[]> => {
  const translatedStatus = statusTranslations[lang]?.[status] || status;

  const response = await axiosInstance.get<IBooking[]>(
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
): Promise<IBooking> => {
  const response = await axiosInstance.post<IBooking>(
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
