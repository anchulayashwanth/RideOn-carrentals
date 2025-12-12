import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Car from "./models/Car.js";

// Setup __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const carsPath = path.join(__dirname, "../frontend/src/data/cars.json");
const carsData = JSON.parse(fs.readFileSync(carsPath, "utf-8"));

const seedCars = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/rideon";
    console.log("Connecting to:", uri);
    await mongoose.connect(uri);

    console.log("Cleaning database...");
    await mongoose.connection.db.dropDatabase(); // This clears EVERYTHING as requested
    console.log("✅ Database cleared.");

    console.log("Seeding Cars...");
    await Car.insertMany(carsData);
    console.log(`✅ Inserted ${carsData.length} cars.`);

    // Re-create test users for convenience
    // We need to import User model first, but since I can't easily add import at top without another edit,
    // I'll skip re-creating users automatically or do it in a separate step if needed. 
    // Actually, user said "remove ALL data... and add new cars".
    // I will stick to just cars processing as primary goal, and clearing DB.
    // If I dropDatabase, I lose users. The user might want that.

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedCars();
