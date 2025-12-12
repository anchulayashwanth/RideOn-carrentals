import express from "express";
import Booking from "../models/Booking.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create booking (protected route)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { carId, carName, startDate, endDate, totalPrice } = req.body;
    const userId = req.userId; // logged-in user's id from token

    console.log("📦 Booking request:", { userId, carId, carName, startDate, endDate, totalPrice });

    if (!userId || !carId || !carName || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const booking = await Booking.create({
      userId,
      carId,
      carName,
      startDate,
      endDate,
      totalPrice,
    });

    console.log("✅ Booking saved:", booking);
    res.status(201).json({ message: "Booking saved successfully", booking });
  } catch (error) {
    console.error("🔥 Booking Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get user bookings
router.get("/my-bookings", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const bookings = await Booking.find({ userId }).populate("carId").sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("🔥 Error fetching bookings:", error.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

export default router;
