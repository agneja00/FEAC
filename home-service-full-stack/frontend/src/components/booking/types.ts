import { Business } from "../business/types";

export type BookingStatus = "confirmed" | "pending" | "completed";

export interface Booking {
  _id: string;
  businessId: string | Business;
  date: Date | null;
  time: string;
  userEmail: string;
  userName: string;
  status: BookingStatus;
}

export type NewBooking = Omit<Booking, "_id">;
