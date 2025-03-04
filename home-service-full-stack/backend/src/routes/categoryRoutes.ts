import express from "express";
import Category from "../models/Category";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

const errorMessages: {
  [key: string]: {
    fetchError: string;
    createError: string;
  };
} = {
  en: {
    fetchError: "Error fetching categories",
    createError: "Error creating category",
  },
  lt: {
    fetchError: "Klaida gaunant kategorijas",
    createError: "Klaida kuriant kategoriją",
  },
  ru: {
    fetchError: "Ошибка при получении категорий",
    createError: "Ошибка при создании категории",
  },
};

router.get("/:lang/categories", async (req, res) => {
  const validLanguages = ["en", "lt", "ru"];
  const defaultLanguage = "en";
  const lang = validLanguages.includes(req.params.lang) ? req.params.lang : defaultLanguage;

  try {
    const categories = await Category.find();

    const translatedCategories = categories.map((category) => ({
      ...category.toObject(),
      name: category.name?.[lang] || category.name.en || category.name,
    }));

    res.send(translatedCategories);
  } catch (err) {
    res.status(500).send({ message: errorMessages[lang].fetchError, error: err });
  }
});

router.post("/:lang/categories", authMiddleware, async (req, res) => {
  const validLanguages = ["en", "lt", "ru"];
  const defaultLanguage = "en";
  const lang = validLanguages.includes(req.params.lang) ? req.params.lang : defaultLanguage;

  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).send(newCategory);
  } catch (err) {
    res.status(400).json({
      message: errorMessages[lang].createError,
      error: (err as Error)?.message ?? err,
    });
  }
});

export default router;
