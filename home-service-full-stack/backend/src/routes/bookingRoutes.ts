import express from "express";
import Booking from "../models/Booking";
import { IService } from "../models/Service";
import authMiddleware from "../middlewares/authMiddleware";
import sendEmail from "../utils/sendEmail";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const errorMessages: { [key: string]: { fetchError: string; createError: string; deleteError: string } } = {
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

router.get("/:lang/bookings/user/:email", authMiddleware, async (req, res) => {
  const { lang, email } = req.params;

  try {
    const bookings = await Booking.find({ userEmail: email }).populate("serviceId").exec();

    const todayUTC = new Date(Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate()
    ));

    const updatedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const bookingDateUTC = new Date(Date.UTC(
          booking.date.getUTCFullYear(),
          booking.date.getUTCMonth(),
          booking.date.getUTCDate()
        ));

        const isCompleted = bookingDateUTC < todayUTC;

        const correctStatus = isCompleted ? "Completed" : "Confirmed";

        if (booking.status !== correctStatus) {
          booking.status = correctStatus;
          booking.translations.status = {
            en: isCompleted ? "Completed" : "Confirmed",
            lt: isCompleted ? "Užbaigta" : "Patvirtinta",
            ru: isCompleted ? "Завершено" : "Подтверждено",
          };
          await booking.save();
        }

        return {
          ...booking.toObject(),
          translatedStatus: booking.translations.status[lang] || booking.status,
        };
      })
    );

    res.json(updatedBookings);
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

    sendEmail({
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
