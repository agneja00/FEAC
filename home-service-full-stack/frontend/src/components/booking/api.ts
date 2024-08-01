import axiosInstance from "@/config/axios";
import {
  Booking,
  BookingStatus,
  BookingWithBusiness,
  NewBooking,
} from "./types";
import { fetchBusinessById } from "../business/api";

export const fetchUserBookings = async (
  userEmail: string,
  status: BookingStatus
): Promise<BookingWithBusiness[]> => {
  const response = await axiosInstance.get<Booking[]>(
    `/bookings/user/${userEmail}`,
    {
      params: { status },
    }
  );
  const bookingsData = response.data;

  const bookingsWithBusiness = await Promise.all(
    bookingsData.map(async (booking) => {
      const business = await fetchBusinessById(booking.businessId);
      return { ...booking, businessId: business };
    })
  );

  return bookingsWithBusiness;
};

export const createBooking = async (booking: NewBooking): Promise<Booking> => {
  const response = await axiosInstance.post<Booking>(`/bookings`, booking);
  return response.data;
};

export const deleteBooking = async (id: string): Promise<void> => {
  await axiosInstance.delete<void>(`/bookings/${id}`);
};
