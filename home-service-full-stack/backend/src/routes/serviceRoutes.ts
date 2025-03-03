import express, { Request, Response } from "express";
import Service from "../models/Service";
import Category from "../models/Category";
import Booking from "../models/Booking";
import authMiddleware from "../middlewares/authMiddleware";
import sendEmail from "../utils/sendEmail";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const router = express.Router();

const errorMessages: {
  [key: string]: {
    fetchError: string;
    createError: string;
    fetchByIdError: string;
    editError: string;
    fetchByCategoryError: string;
    fetchBookingsError: string;
    fetchFavoritesError: string;
    toggleFavoriteError: string;
  };
} = {
  en: {
    fetchError: "Error fetching services",
    createError: "Error creating service",
    fetchByIdError: "Error fetching service",
    editError: "Error editing service",
    fetchByCategoryError: "Error fetching services by category",
    fetchBookingsError: "Error fetching bookings",
    fetchFavoritesError: "Error fetching favorites",
    toggleFavoriteError: "Error toggling favorite",
  },
  lt: {
    fetchError: "Klaida gaunant paslaugas",
    createError: "Klaida kuriant paslaugą",
    fetchByIdError: "Klaida gaunant paslaugą",
    editError: "Klaida redaguojant paslaugą",
    fetchByCategoryError: "Klaida gaunant paslaugas pagal kategoriją",
    fetchBookingsError: "Klaida gaunant rezervacijas",
    fetchFavoritesError: "Klaida gaunant mėgstamas paslaugas",
    toggleFavoriteError: "Klaida keičiant mėgstamą paslaugą",
  },
};

router.get("/:lang/services", async (req: Request, res: Response) => {
  const lang = req.params.lang || "en";
  try {
    const services = await Service.find();
    const translatedServices = services.map((service) => ({
      ...service.toObject(),
      name: service.translations.name[lang] || service.translations.name.en,
      about: service.translations.about[lang] || service.translations.about.en,
      category: service.translations.category[lang] || service.translations.category.en,
    }));
    res.json(translatedServices);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching services",
      error: err instanceof Error ? err.message : err,
    });
  }
});

router.post("/:lang/services", authMiddleware, async (req: Request, res: Response) => {
  const validLanguages = ["en", "lt"];
  const defaultLanguage = "en";
  const lang = validLanguages.includes(req.params.lang) ? req.params.lang : defaultLanguage;

  const { name, about, address, category, contactPerson, email, translations } = req.body;

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
      translations,
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
      message: errorMessages[lang].createError,
      error: err instanceof Error ? err.message : err,
    });
  }
});

router.get("/:lang/service/:id", async (req: Request, res: Response) => {
  const validLanguages = ["en", "lt"];
  const defaultLanguage = "en";
  const lang = validLanguages.includes(req.params.lang) ? req.params.lang : defaultLanguage;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      const translatedService = {
        ...service.toObject(),
        name: service.translations.name[lang] || service.translations.name.en,
        about: service.translations.about[lang] || service.translations.about.en,
        category: service.translations.category[lang] || service.translations.category.en,
      };
      res.json(translatedService);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: errorMessages[lang].fetchByIdError,
      error: err instanceof Error ? err.message : err,
    });
  }
});

router.put("/:lang/service/:id", authMiddleware, async (req: Request, res: Response) => {
  const validLanguages = ["en", "lt"];
  const defaultLanguage = "en";
  const lang = validLanguages.includes(req.params.lang) ? req.params.lang : defaultLanguage;

  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (err) {
    res.status(400).json({
      message: errorMessages[lang].editError,
      error: err instanceof Error ? err.message : err,
    });
  }
});

router.get("/:lang/services/categories/:category", async (req: Request, res: Response) => {
  const validLanguages = ["en", "lt"];
  const defaultLanguage = "en";
  const lang = validLanguages.includes(req.params.lang) ? req.params.lang : defaultLanguage;

  try {
    const filteredServices = await Service.find({
      category: req.params.category,
    });
    const categories = await Category.find();

    const translatedServices = filteredServices.map((service) => ({
      ...service.toObject(),
      name: service.translations?.name?.[lang] || service.translations?.name?.en || service.name,
      about: service.translations?.about?.[lang] || service.translations?.about?.en || service.about,
      category: service.translations?.category?.[lang] || service.translations?.category?.en || service.category,
    }));

    const translatedCategories = categories.map((category) => ({
      ...category.toObject(),
      name: category.name?.[lang] || category.name.en || category.name,
    }));

    res.status(200).json({ services: translatedServices, categories: translatedCategories });
  } catch (err) {
    res.status(500).json({
      message: errorMessages[lang].fetchByCategoryError,
      error: err instanceof Error ? err.message : err,
    });
  }
});

router.get("/:lang/services/:id/bookings/date/:date", authMiddleware, async (req: Request, res: Response) => {
  const validLanguages = ["en", "lt"];
  const defaultLanguage = "en";
  const lang = validLanguages.includes(req.params.lang) ? req.params.lang : defaultLanguage;

  try {
    const slots = await Booking.find({
      serviceId: req.params.id,
      date: new Date(req.params.date),
    });

    res.json(slots);
  } catch (err) {
    res.status(500).json({
      message: errorMessages[lang].fetchBookingsError,
      error: err instanceof Error ? err.message : err,
    });
  }
});

router.get("/:lang/services/user/:email/favorites", authMiddleware, async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "User email is required" });
    }
    const favoriteServices = await Service.find({ favoritedBy: email });
    res.json(favoriteServices);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:lang/services/user/:email/favorites", authMiddleware, async (req, res) => {
  const validLanguages = ["en", "lt"];
  const defaultLanguage = "en";
  const lang = validLanguages.includes(req.params.lang) ? req.params.lang : defaultLanguage;

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
    res.status(500).json({ message: errorMessages[lang].toggleFavoriteError, error });
  }
});

export default router;
