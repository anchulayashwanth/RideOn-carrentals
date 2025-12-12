import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import carRoutes from "./routes/carRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGODB_URI ||
    "mongodb://anchulayeswanth9_db_user:sq0aOyP0WRxQXqK9@ac-ulig1z4-shard-00-02.vazkoy7.mongodb.net:27017/rideon?ssl=true&authSource=admin&retryWrites=true&w=majority&directConnection=true"
  )
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// --- API Routes ---
app.use("/api/cars", carRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/bookings", bookingRoutes);

// --- Serve Frontend in Production ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("RideOn API is running 🚗 (Development Mode)");
  });
}

// --- Start Server ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
