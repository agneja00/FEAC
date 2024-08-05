import express from "express";
import cors from "cors";
import { connectToDb, PORT } from "./db";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import businessRoutes from "./routes/businessRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/businesses", businessRoutes);
app.use("/bookings", bookingRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});

connectToDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
