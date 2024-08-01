import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBooking, fetchUserBookings } from "./api";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { BookingStatus, BookingWithBusiness } from "./types";

export const BOOKING_KEY = "BOOKING";

export const useUserBookings = (status: BookingStatus) => {
  const { user } = useContext(UserContext);
  const userEmail = user!.email;

  return useQuery({
    queryKey: [BOOKING_KEY, userEmail, status],
    queryFn: async () => {
      const bookings: BookingWithBusiness[] = await fetchUserBookings(userEmail, status);
      return bookings.filter((booking) => booking.userEmail === userEmail);
    },
  });
};

export const useAddBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BOOKING_KEY] }),
  });
};
