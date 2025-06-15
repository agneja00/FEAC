import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import User from "../models/User";
import { generateToken } from "../utils/password";

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads", "avatars");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/:lang/auth/register", async (req, res) => {
  const validLanguages = ["en", "lt", "ru"];
  const defaultLanguage = "en";
  const lang = validLanguages.includes(req.params.lang) ? req.params.lang : defaultLanguage;

  const errorMessages: Record<string, { userExists: string; serverError: string }> = {
    en: {
      userExists: "User already exists",
      serverError: "Error registering new user.",
    },
    lt: {
      userExists: "Vartotojas jau egzistuoja",
      serverError: "Klaida registruojant naują vartotoją.",
    },
    ru: {
      userExists: "Пользователь уже существует",
      serverError: "Ошибка при регистрации нового пользователя.",
    },
  };

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
  const validLanguages = ["en", "lt", "ru"];
  const defaultLanguage = "en";
  const lang = validLanguages.includes(req.params.lang) ? req.params.lang : defaultLanguage;

  const errorMessages: Record<string, { missingFields: string; incorrectCredentials: string; serverError: string }> = {
    en: {
      missingFields: "Please provide email and password",
      incorrectCredentials: "Incorrect email or password",
      serverError: "Error logging in.",
    },
    lt: {
      missingFields: "Prašome pateikti el. paštą ir slaptažodį",
      incorrectCredentials: "Neteisingas el. paštas arba slaptažodis",
      serverError: "Prisijungimo klaida.",
    },
    ru: {
      missingFields: "Пожалуйста, введите email и пароль",
      incorrectCredentials: "Неверный email или пароль",
      serverError: "Ошибка при входе в систему.",
    },
  };

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

router.get("/:lang/user/:email", async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email }).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.put("/:lang/user/:email", async (req, res) => {
  const { email } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ email }, updateData, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error while updating user." });
  }
});

router.post("/user/upload-avatar", upload.single("avatar"), async (req, res) => {
  const email = req.body.email;
  if (!email || !req.file) {
    return res.status(400).json({ message: "Email and avatar image are required." });
  }

  const avatarUrl = `/uploads/avatars/${req.file.filename}`;
  try {
    const updatedUser = await User.findOneAndUpdate({ email }, { avatarUrl }, { new: true }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Avatar uploaded", avatarUrl, user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error uploading avatar", error: (err as Error).message });
  }
});

export default router;
