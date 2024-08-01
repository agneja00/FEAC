import express from "express";
import Booking from "../models/Booking";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("businessId").exec();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings for the user", error: err });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
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
