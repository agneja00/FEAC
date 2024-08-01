import express from "express";
import Category from "../models/Category";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    res.status(500).send({ message: "Error fetching categories", error: err });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).send(newCategory);
  } catch (err) {
    res.status(400).json({
      message: "Error creating category",
      error: (err as Error)?.message ?? err,
    });
  }
});

export default router;
