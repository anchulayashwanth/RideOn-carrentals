import express from "express";
import { getCars, seedCars } from "../controllers/carController.js";

const router = express.Router();

router.get("/", getCars);
router.post("/seed", seedCars); // optional: bulk insert cars

export default router;
