import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import carRoutes from "./routes/carRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB, then start server
const startServer = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error("❌ Exiting due to DB connection failure:", err.message);
    process.exit(1);
  }

  // API Routes
  app.use("/api/cars", carRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/bookings", bookingRoutes);

  // Backend-only service (frontend deployed separately)
  app.get("/", (req, res) => {
    res.send("RideOn API is running 🚗");
  });

  // Render-required port
  if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  }
};
startServer();

// (server is started in startServer after DB connection)
