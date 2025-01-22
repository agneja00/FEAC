import axiosInstance from "@/config/axios";
import { Booking, BookingStatus, NewBooking } from "./types";
import { fetchServiceById } from "../service/api";

export const fetchUserBookings = async (
  userEmail: string,
  status: BookingStatus,
): Promise<Booking[]> => {
  const response = await axiosInstance.get<Booking[]>(
    `/bookings/user/${userEmail}`,
    {
      params: { status },
    },
  );
  const bookings = response.data;

  const bookingsWithService = await Promise.all(
    bookings.map(async (booking) => {
      if (typeof booking.serviceId === "string") {
        const service = await fetchServiceById(booking.serviceId);
        return { ...booking, serviceId: service };
      }
      return booking;
    }),
  );

  return bookingsWithService;
};

export const createBooking = async (booking: NewBooking): Promise<Booking> => {
  const response = await axiosInstance.post<Booking>(`/bookings`, booking);
  return response.data;
};

export const deleteBooking = async (id: string): Promise<void> => {
  await axiosInstance.delete<void>(`/bookings/${id}`);
};
