import express from "express";
import multer from "multer";
import User from "../models/User";
import { generateToken } from "../utils/password";
import cloudinary from "../utils/cloudinary";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const validLanguages = ["en", "lt", "ru"];
const defaultLanguage = "en";

const errorMessages: Record<string, any> = {
  en: {
    userExists: "User already exists",
    serverError: "Error registering new user.",
    missingFields: "Please provide email and password",
    incorrectCredentials: "Incorrect email or password",
    updateError: "Server error while updating user.",
  },
  lt: {
    userExists: "Vartotojas jau egzistuoja",
    serverError: "Klaida registruojant naują vartotoją.",
    missingFields: "Prašome pateikti el. paštą ir slaptažodį",
    incorrectCredentials: "Neteisingas el. paštas arba slaptažodis",
    updateError: "Klaida atnaujinant vartotoją.",
  },
  ru: {
    userExists: "Пользователь уже существует",
    serverError: "Ошибка при регистрации нового пользователя.",
    missingFields: "Пожалуйста, введите email и пароль",
    incorrectCredentials: "Неверный email или пароль",
    updateError: "Ошибка при обновлении пользователя.",
  },
};

router.post("/:lang/auth/register", async (req, res) => {
  const lang = validLanguages.includes(req.params.lang) ? req.params.lang : defaultLanguage;
  try {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: errorMessages[lang].userExists });
    }
    const newUser = new User(user);
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({
      message: errorMessages[lang].serverError,
      error: (err as Error).message,
    });
  }
});

router.post("/:lang/auth/login", async (req, res) => {
  const lang = validLanguages.includes(req.params.lang) ? req.params.lang : defaultLanguage;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: errorMessages[lang].missingFields });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.isCorrectPassword(password))) {
      return res.status(401).json({ message: errorMessages[lang].incorrectCredentials });
    }

    const token = generateToken(user._id);
    const userWithoutPassword = await User.findById(user._id).select("-password");

    return res.status(200).json({ status: "success", token, user: userWithoutPassword });
  } catch (err) {
    return res.status(500).json({
      message: errorMessages[lang].serverError,
      error: (err as Error).message,
    });
  }
});

router.get("/:lang/user/:email", authMiddleware, async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email }).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.put("/:lang/user/:email", upload.single("photo"), authMiddleware, async (req, res) => {
  const lang = validLanguages.includes(req.params.lang) ? req.params.lang : defaultLanguage;
  const currentEmail = req.params.email;
  const { name, surname, age, country, city, password, email: newEmail } = req.body;

  try {
    const updateData: any = {
      name,
      surname,
      age,
      country,
      city,
      email: newEmail || currentEmail,
    };

    if (req.file) {
      const file = req.file;

      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "avatars",
            public_id: `${newEmail || currentEmail}_avatar`,
            overwrite: true,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        stream.end(file.buffer);
      });

      updateData.photo = result.secure_url;
    }

    if (password) {
      const bcrypt = await import("bcryptjs");
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findOneAndUpdate({ email: currentEmail }, updateData, { new: true }).select(
      "-password",
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: errorMessages[lang].updateError });
  }
});

export default router;
