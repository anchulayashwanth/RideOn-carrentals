import Car from "../models/Car.js";

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ id: 1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const seedCars = async (req, res) => {
  try {
    const payload = req.body;
    if (!Array.isArray(payload)) {
      return res.status(400).json({ message: "Expected an array of cars" });
    }
    await Car.deleteMany({});
    const inserted = await Car.insertMany(payload);
    res.json({ inserted: inserted.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
