import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBooking, deleteBooking, fetchUserBookings } from "./api.ts";
import { UserContext } from "../context/UserContext.tsx";
import { useContext } from "react";
import { BookingStatus } from "./types.ts";

export const BOOKING_KEY = "BOOKING";

export const useUserBookings = (status: BookingStatus) => {
  const { user } = useContext(UserContext);
  const userEmail = user!.email;

  return useQuery({
    queryKey: [BOOKING_KEY, userEmail, status],
    queryFn: async () => {
      const bookings = await fetchUserBookings(userEmail, status);
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

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOKING_KEY] });
    },
  });
};
