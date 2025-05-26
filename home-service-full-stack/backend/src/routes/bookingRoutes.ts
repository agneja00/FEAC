import express from "express";
import Booking from "../models/Booking";
import { IService } from "../models/Service";
import authMiddleware from "../middlewares/authMiddleware";
import sendEmail from "../utils/sendEmail";
import dotenv from "dotenv";

dotenv.config();

function evaluateBookingStatus(date: Date): {
  status: "Confirmed" | "Completed";
  translations: {
    en: string;
    lt: string;
    ru: string;
  };
} {
  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const bookingDateUTC = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

  const isCompleted = bookingDateUTC < todayUTC;

  return {
    status: isCompleted ? "Completed" : "Confirmed",
    translations: {
      en: isCompleted ? "Completed" : "Confirmed",
      lt: isCompleted ? "Užbaigta" : "Patvirtinta",
      ru: isCompleted ? "Завершено" : "Подтверждено",
    },
  };
}

const router = express.Router();

const errorMessages: Record<string, { fetchError: string; createError: string; deleteError: string }> = {
  en: {
    fetchError: "Error fetching bookings for the user",
    createError: "Error creating booking",
    deleteError: "Error deleting booking",
  },
  lt: {
    fetchError: "Klaida gaunant vartotojo rezervacijas",
    createError: "Klaida kuriant rezervaciją",
    deleteError: "Klaida šalinant rezervaciją",
  },
  ru: {
    fetchError: "Ошибка при получении бронирований пользователя",
    createError: "Ошибка при создании бронирования",
    deleteError: "Ошибка при удалении бронирования",
  },
};

router.get("/:lang/bookings/user/:email/:status", authMiddleware, async (req, res) => {
  const { lang, email, status } = req.params;

  try {
    const allowedStatuses = ["Confirmed", "Completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status filter." });
    }

    const rawBookings = await Booking.find({ userEmail: email }).populate("serviceId");

    const updatedBookings = await Promise.all(
      rawBookings.map(async (booking) => {
        const { status: newStatus, translations } = evaluateBookingStatus(booking.date);

        if (booking.status !== newStatus) {
          booking.status = newStatus;
          booking.translations.status = translations;
          await booking.save();
        }

        const obj = booking.toObject();
        return {
          ...obj,
          status: booking.status,
          translatedStatus: booking.translations.status[lang] || booking.status,
        };
      }),
    );

    const filteredBookings = updatedBookings.filter((b) => b.status === status);

    res.json(filteredBookings);
  } catch (err) {
    res.status(500).json({
      message: errorMessages[lang]?.fetchError || errorMessages.en.fetchError,
      error: err,
    });
  }
});

router.post("/:lang/bookings", authMiddleware, async (req, res) => {
  const lang = req.params.lang === "lt" ? "lt" : req.params.lang === "ru" ? "ru" : "en";

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

    const emailMessages = {
      en: {
        subject: "Booking Confirmation",
        text: `Dear ${userName}, your booking with ${serviceName} on ${date} at ${time} has been confirmed.`,
        html: `<p>Dear ${userName}, your booking with <strong>${serviceName}</strong> on <strong>${date}</strong> at <strong>${time}</strong> has been <i>confirmed</i>.</p>`,
      },
      lt: {
        subject: "Rezervacijos patvirtinimas",
        text: `Gerb. ${userName}, jūsų rezervacija su ${serviceName} ${date} ${time} buvo patvirtinta.`,
        html: `<p>Gerb. ${userName}, jūsų rezervacija su <strong>${serviceName}</strong> <strong>${date}</strong> <strong>${time}</strong> buvo <i>patvirtinta</i>.</p>`,
      },
      ru: {
        subject: "Подтверждение бронирования",
        text: `Уважаемый(ая) ${userName}, ваше бронирование услуги ${serviceName} на ${date} в ${time} подтверждено.`,
        html: `<p>Уважаемый(ая) ${userName}, ваше бронирование услуги <strong>${serviceName}</strong> на <strong>${date}</strong> в <strong>${time}</strong> подтверждено.</p>`,
      },
    };

    await sendEmail({
      to: userEmail!,
      from: process.env.EMAIL!,
      subject: emailMessages[lang].subject,
      text: emailMessages[lang].text,
      html: emailMessages[lang].html,
    });

    res.status(201).json(bookingWithService);
  } catch (err) {
    res.status(400).json({
      message: errorMessages[lang].createError,
      error: (err as Error)?.message ?? err,
    });
  }
});

export default router;
