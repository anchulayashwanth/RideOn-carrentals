import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Save contact form data
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = await Contact.create({ name, email, message });
    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
