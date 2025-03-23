import mongoose from "mongoose";

export interface IService {
  name: string;
  about: string;
  address: string;
  category: string;
  contactPerson: string;
  email: string;
  imageUrls: string[];
  favoritedBy: string[];
  translations: {
    name: {
      en: string;
      lt: string;
      ru: string;
      [key: string]: string;
    };
    about: {
      en: string;
      lt: string;
      ru: string;
      [key: string]: string;
    };
    category: {
      en: string;
      lt: string;
      ru: string;
      [key: string]: string;
    };
  };
}

const serviceSchema = new mongoose.Schema<IService>({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Shifting", "Repair", "Plumbing", "Cleaning", "Painting", "Electric", "Decoration"],
  },
  contactPerson: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (email: string) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: "Invalid email format",
    },
  },
  imageUrls: [
    {
      type: String,
      default: [],
    },
  ],
  favoritedBy: [
    {
      type: String,
      default: [],
    },
  ],
  translations: {
    name: {
      en: { type: String, default: "" },
      lt: { type: String, default: "" },
      ru: { type: String, default: "" },
    },
    about: {
      en: { type: String, default: "" },
      lt: { type: String, default: "" },
      ru: { type: String, default: "" },
    },
    category: {
      en: { type: String, default: "" },
      lt: { type: String, default: "" },
      ru: { type: String, default: "" },
    },
  },
});

serviceSchema.index({ category: 1 });
serviceSchema.index({ favoritedBy: 1 });

const Service = mongoose.model<IService>("Service", serviceSchema);

export default Service;
