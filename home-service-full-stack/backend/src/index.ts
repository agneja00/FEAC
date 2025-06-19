import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";

import { connectToDb, PORT } from "./db";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

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
