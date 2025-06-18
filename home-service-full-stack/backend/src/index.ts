import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";

import { connectToDb, PORT } from "./db";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://home-services-f898b008a33e.herokuapp.com/en"],
    credentials: true,
  }),
);

app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/uploads/avatars", express.static(path.join(__dirname, "uploads", "avatars")));

app.use("/", authRoutes);
app.use("/", categoryRoutes);
app.use("/", serviceRoutes);
app.use("/", bookingRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});

connectToDb()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err);
  });
