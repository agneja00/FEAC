import { Service } from "../service/types";

export type BookingStatus = "confirmed" | "pending" | "completed";

export interface Booking {
  _id: string;
  serviceId: string | Service;
  date: Date | null;
  time: string;
  userEmail: string;
  userName: string;
  status: BookingStatus;
}

export type NewBooking = Omit<Booking, "_id">;
