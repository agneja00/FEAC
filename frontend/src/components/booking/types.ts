import { IService } from "../service/types";

export type TBookingStatus = "Confirmed" | "Completed";

export interface IBooking {
  _id: string;
  serviceId: string | IService;
  date: Date | null;
  time: string;
  userEmail: string;
  userName: string;
  status: TBookingStatus;
  translations: {
    status: {
      en: string;
      lt: string;
      ru: string;
      [key: string]: string;
    };
  };
}

export type NewBooking = Omit<IBooking, "_id">;
