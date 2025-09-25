import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBooking, deleteBooking, fetchUserBookings } from "./api";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { TBookingStatus, NewBooking } from "./types";
import { useParams } from "react-router-dom";

export const BOOKING_KEY = "BOOKING";

export const useUserBookings = (status: TBookingStatus) => {
  const { lang } = useParams<{ lang: string }>();
  const { user } = useContext(UserContext);
  const userEmail = user!.email;

  return useQuery({
    queryKey: [BOOKING_KEY, userEmail, status, lang],
    queryFn: async () => {
      const bookings = await fetchUserBookings(lang || "en", userEmail, status);

      return bookings.map((booking) => ({
        ...booking,
        translatedStatus:
          booking.translations?.status?.[lang || "en"] || booking.status,
      }));
    },
  });
};

export const useAddBooking = () => {
  const queryClient = useQueryClient();
  const { lang } = useParams<{ lang: string }>();

  return useMutation({
    mutationFn: (booking: NewBooking) => {
      return createBooking(lang || "en", booking);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [BOOKING_KEY] });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { lang } = useParams<{ lang: string }>();

  return useMutation({
    mutationFn: (id: string) => {
      return deleteBooking(lang || "en", id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [BOOKING_KEY] });
    },
  });
};
