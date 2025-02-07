import express, { Request, Response } from "express";
import Service from "../models/Service";
import Booking from "../models/Booking";
import authMiddleware from "../middlewares/authMiddleware";
import sendEmail from "../utils/sendEmail";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching services",
      error: err instanceof Error ? err.message : err,
    });
  }
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { name, about, address, category, contactPerson, email } = req.body;

  try {
    const newService = new Service({
      name,
      about,
      address,
      category,
      contactPerson,
      email,
      imageUrls: req.body.imageUrls || [],
      favoritedBy: [],
    });

    await newService.save();

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

    res.status(201).json({
      message: "Service created and email sent successfully!",
      service: newService,
    });
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(500).json({
      message: "Server error while creating service",
      error: err instanceof Error ? err.message : err,
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const service = await Service.findById(req.params.id);
    service ? res.json(service) : res.status(404).json({ message: "Service not found" });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching service",
      error: err instanceof Error ? err.message : err,
    });
  }
});

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (err) {
    res.status(400).json({
      message: "Error editing service",
      error: err instanceof Error ? err.message : err,
    });
  }
});

router.get("/categories/:category", async (req: Request, res: Response) => {
  try {
    const filteredServices = await Service.find({
      category: req.params.category,
    });

    res.status(200).json(filteredServices);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching services by category",
      error: err instanceof Error ? err.message : err,
    });
  }
});

router.get("/:id/bookings/date/:date", authMiddleware, async (req: Request, res: Response) => {
  try {
    const slots = await Booking.find({
      serviceId: req.params.id,
      date: new Date(req.params.date),
    });

    res.json(slots);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching bookings",
      error: err instanceof Error ? err.message : err,
    });
  }
});

router.get("/user/:email/favorites", authMiddleware, async (req: Request, res: Response) => {
  try {
    const services = await Service.find({ favoritedBy: req.params.email });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites" });
  }
});

router.post("/user/:email/favorites", authMiddleware, async (req, res) => {
  const { email, serviceId } = req.body;
  try {
    if (!email || !serviceId) {
      return res.status(400).json({ message: "Missing email or serviceId" });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.favoritedBy.includes(email)) {
      service.favoritedBy = service.favoritedBy.filter((e) => e !== email);
    } else {
      service.favoritedBy.push(email);
    }

    await service.save();
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});
export default router;
