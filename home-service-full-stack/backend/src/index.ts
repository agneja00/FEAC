import express from "express";
import cors from "cors";
import { connectToDb, PORT } from "./db";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/", authRoutes);
app.use("/", categoryRoutes);
app.use("/", serviceRoutes);
app.use("/", bookingRoutes);

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
