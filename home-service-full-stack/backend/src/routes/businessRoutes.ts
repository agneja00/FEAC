import express from "express";
import Business from "../models/Business";
import Booking from "../models/Booking";
import authMiddleware from "../middlewares/authMiddleware";
import sendEmail from "../utils/sendEmail";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching businesses", error: err });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { name, about, address, category, contactPerson, email } = req.body;

  try {
    await sendEmail({
      to: process.env.EMAIL!,
      from: process.env.EMAIL!,
      subject: `${name} wants to collaborate!`,
      text: `Business name: ${name},
      About: ${about},
      Address: ${address},
      Category: ${category},
      Contact Person: ${contactPerson},
      Email: ${email}.`,
      html: `<ul>
        <li><strong>Business name:</strong> ${name}</li>
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
    const business = await Business.findById(req.params.id);
    if (business) {
      res.json(business);
    } else {
      res.status(404).send("Business not found");
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching business", error: err });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBusiness) {
      return res.status(404).send("Business not found");
    }
    res.json(updatedBusiness);
  } catch (err) {
    res.status(400).json({
      message: "Error cediting business",
      error: (err as Error)?.message ?? err,
    });
  }
});

router.get("/category/:category", authMiddleware, async (req, res) => {
  try {
    const filteredBusinesses = await Business.find({
      category: req.params.category.toLowerCase(),
    });
    res.status(200).json(filteredBusinesses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching businesses by category", error: err });
  }
});

router.get("/:id/bookings/date/:date", authMiddleware, async (req, res) => {
  try {
    const slots = await Booking.find({
      businessId: req.params.id,
      date: new Date(req.params.date),
    });
    res.json(slots);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching bookings for the specified date and business",
      error: err,
    });
  }
});

export default router;
