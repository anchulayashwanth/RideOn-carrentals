import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, required: true },
  fuel_type: { type: String, required: true },
  seating_capacity: { type: Number, required: true },
  daily_rate_inr: { type: Number, required: true },
  availability_status: { type: String, default: "Available" },
  image_url: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Car || mongoose.model("Car", carSchema);
