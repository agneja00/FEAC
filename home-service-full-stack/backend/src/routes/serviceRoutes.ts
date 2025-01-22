import express from "express";
import Service from "../models/Service";
import Booking from "../models/Booking";
import authMiddleware from "../middlewares/authMiddleware";
import sendEmail from "../utils/sendEmail";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Error fetching services", error: err });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { name, about, address, category, contactPerson, email } = req.body;

  try {
    await sendEmail({
      to: process.env.EMAIL!,
      from: process.env.EMAIL!,
      subject: `${name} wants to collaborate!`,
      text: `Service name: ${name},
      About: ${about},
      Address: ${address},
      Category: ${category},
      Contact Person: ${contactPerson},
      Email: ${email}.`,
      html: `<ul>
        <li><strong>Service name:</strong> ${name}</li>
        <li><strong>About:</strong> ${about}</li>
        <li><strong>Address:</strong> ${address}</li>
        <li><strong>Category:</strong> ${category}</li>
        <li><strong>Contact Person:</strong> ${contactPerson}</li>
        <li><strong>Email:</strong> ${email}</li>
      </ul>`,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({
      message: "Server error while sending email.",
      error: (err as Error).message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      res.json(service);
    } else {
      res.status(404).send("Service not found");
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching service", error: err });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedService) {
      return res.status(404).send("Service not found");
    }
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({
      message: "Error cediting service",
      error: (err as Error)?.message ?? err,
    });
  }
});

router.get("/category/:category", authMiddleware, async (req, res) => {
  try {
    const filteredServices = await Service.find({
      category: req.params.category.toLowerCase(),
    });
    res.status(200).json(filteredServices);
  } catch (err) {
    res.status(500).json({ message: "Error fetching services by category", error: err });
  }
});

router.get("/:id/bookings/date/:date", authMiddleware, async (req, res) => {
  try {
    const slots = await Booking.find({
      serviceId: req.params.id,
      date: new Date(req.params.date),
    });
    res.json(slots);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching bookings for the specified date and service",
      error: err,
    });
  }
});

export default router;
