import express from "express";
import Booking from "../models/Booking";
import { IService } from "../models/Service";
import authMiddleware from "../middlewares/authMiddleware";
import sendEmail from "../utils/sendEmail";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("serviceId").exec();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings for the user", error: err });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const bookingWithService = await Booking.findById(newBooking._id).populate("serviceId");
    const service = bookingWithService?.serviceId as unknown as IService;

    const userEmail = bookingWithService?.userEmail;
    const userName = bookingWithService?.userName;
    const serviceName = service?.name;
    const date = bookingWithService?.date.toISOString().split("T")[0];
    const time = bookingWithService?.time;

    sendEmail({
      to: userEmail!,
      from: process.env.EMAIL!,
      subject: "Rezervacijos patvirtinimas",
      text: `Gerb. ${userName}, jūsų rezervacija su ${serviceName} ${date} ${time} buvo patvirtinta.`,
      html: `<p>Gerb. ${userName}, jūsų rezervacija su <strong>${serviceName}</strong> <strong>${date}</strong> <strong>${time}</strong> buvo <i>patvirtinta</i>.</p>`,
    });
    res.status(201).json(bookingWithService);
  } catch (err) {
    res.status(400).json({
      message: "Error creating booking",
      error: (err as Error)?.message ?? err,
    });
  }
});

router.get("/user/:email", authMiddleware, async (req, res) => {
  try {
    const userBookings = await Booking.find({ userEmail: req.params.email });
    res.json(userBookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings for the user", error: err });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    res.json(deletedBooking);
  } catch (err) {
    res.status(404).json(err);
  }
});

export default router;
