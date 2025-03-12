import express from 'express';
import mongoose from "mongoose";  // Add this import
import { Itinerary } from "../models/itineraryModel.js";

const router = express.Router();

router.get("/info", async (req, res) => {
  try {
    const { userId } = req.query;
    console.log("Received userId:", userId);  // Debugging

    if (!userId) return res.status(400).json({ message: "User ID required" });

    // Convert userId to ObjectId
    const itineraries = await Itinerary.find({ userId: new mongoose.Types.ObjectId(userId) });
    
    console.log("Fetched itineraries:", itineraries);  // Debugging
    res.json(itineraries);

  } catch (error) {
    console.error("Error fetching itineraries:", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
});

export default router;
