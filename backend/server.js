import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import carRoutes from "./routes/carRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

const app = express();

// Deployment health logs
console.log("Current Environment:", process.env.NODE_ENV);
console.log("MongoDB URI defined:", !!process.env.MONGODB_URI);

// Connect to MongoDB
connectDB().catch(err => {
  console.error("❌ MongoDB connection failure:", err.message);
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/cars", carRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/bookings", bookingRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "RideOn API is running 🚗",
    env: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString()
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Export the app for Vercel
export default app;
