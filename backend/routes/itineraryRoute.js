import express from 'express';
import { Itinerary } from "../models/itineraryModel.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";  


const router = express.Router();

router.post("/save", authenticateJWT, async (req, res) => {
    try {
      const itinerary = new Itinerary(req.body);
      await itinerary.save();
      res.status(201).json({ message: "Itinerary saved successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save itinerary" });
    }
  });
  


export default router;
