import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register (Signup)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("🧾 Signup data received:", { name, email, password });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("🔥 Signup Error:", error);
    res.status(500).json({ message: error.message });
  }
});


// Login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    console.log("📩 Incoming Login Request:");
    console.log("Email:", email);
    console.log(`Entered Password: '${password}' (Length: ${password.length})`);
    for (let i = 0; i < password.length; i++) {
      console.log(`Char[${i}]: ${password.charCodeAt(i)}`);
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("🔐 DB Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password Match Result:", isMatch);

    if (!isMatch) {
      console.log("❌ Invalid credentials - bcrypt comparison failed");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1d" });
    console.log("✅ Login successful for:", user.email);

    res.json({ token, user });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
