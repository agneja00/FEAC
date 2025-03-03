import mongoose from "mongoose";

interface ICategory {
  name: {
    en: string;
    lt: string;
    [key: string]: string;
  };
  url: string;
}

const categorySchema = new mongoose.Schema<ICategory>({
  name: {
    en: { type: String, required: true },
    lt: { type: String, required: true },
  },
  url: {
    type: String,
    default: "https://img.icons8.com/?size=100&id=6644&format=png&color=000000",
  },
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
