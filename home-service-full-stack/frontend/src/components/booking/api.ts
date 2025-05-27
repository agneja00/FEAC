import axiosInstance from "@/config/axios";
import { IBooking, NewBooking } from "./types";
import { fetchServiceById } from "../service/api";

export const fetchUserBookings = async (
  lang: string,
  userEmail: string,
  status: string,
): Promise<IBooking[]> => {
  const response = await axiosInstance.get<IBooking[]>(
    `/${lang}/bookings/user/${userEmail}/${status}`,
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
