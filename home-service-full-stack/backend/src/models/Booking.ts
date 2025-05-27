import mongoose, { Types, Document } from "mongoose";

export interface IBooking extends Document {
  serviceId: Types.ObjectId;
  date: Date;
  time: string;
  userEmail: string;
  userName: string;
  status: "Confirmed" | "Completed";
  translations: {
    status: {
      en: string;
      lt: string;
      ru: string;
      [key: string]: string;
    };
  };
}

const bookingSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Confirmed", "Completed"],
    default: "Confirmed",
  },
  translations: {
    status: {
      en: { type: String, required: true },
      lt: { type: String, required: true },
      ru: { type: String, required: true },
    },
  },
});

bookingSchema.pre<IBooking>("save", function (next) {
  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const bookingDateUTC = new Date(
    Date.UTC(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate()),
  );

  if (bookingDateUTC < todayUTC) {
    this.status = "Completed";
    this.translations.status = {
      en: "Completed",
      lt: "Užbaigta",
      ru: "Завершено",
    };
  } else {
    this.status = "Confirmed";
    this.translations.status = {
      en: "Confirmed",
      lt: "Patvirtinta",
      ru: "Подтверждено",
    };
  }

  next();
});

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
