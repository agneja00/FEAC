import { Service } from "../service/types";

export type BookingStatus = "Confirmed" | "Completed";

export interface Booking {
  _id: string;
  serviceId: string | Service;
  date: Date | null;
  time: string;
  userEmail: string;
  userName: string;
  status: BookingStatus;
  translations: {
    status: {
      en: string;
      lt: string;
      ru: string;
      [key: string]: string;
    };
  };
}

export type NewBooking = Omit<Booking, "_id">;
