import mongoose, { Types, Document } from "mongoose";

interface IBooking extends Document {
  serviceId: Types.ObjectId;
  date: Date;
  time: string;
  userEmail: string;
  userName: string;
  status: "Confirmed" | "Completed";
}

const bookingSchema = new mongoose.Schema<IBooking>({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  date: {
    type: Date,
    required: [true, "Date field is required. e.g. 2022-04-28"],
  },
  time: {
    type: String,
    required: [true, "Time field is required. e.g. 14:00"],
  },
  userEmail: {
    type: String,
    required: [true, "User email field is required."],
    validate: {
      validator: function (email: string) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: (props: { value: string }) => `${props.value} is not a valid email!`,
    },
  },
  userName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["Confirmed", "Completed"],
      message: "{VALUE} is not supported",
    },
    default: "Confirmed",
  },
});

bookingSchema.pre<IBooking>("save", function (next) {
  const now = new Date();
  if (this.date < now) {
    this.status = "Completed";
  } else {
    this.status = "Confirmed";
  }
  next();
});

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
