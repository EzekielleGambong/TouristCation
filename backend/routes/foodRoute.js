import express from 'express';
import { Food } from '../models/foodModel.js';

const router = express.Router();



router.get('/filtered', async (req, res) => {
    try {
        const { category } = req.query;
        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }

        const filteredFood = await Food.find({
            category: { $regex: new RegExp(`^${category}$`, "i") } // Case-insensitive
        });

        res.status(200).json(filteredFood);
    } catch (error) {
        res.status(500).json({ message: "Error fetching food data", error });
    }
});

  
  



export default router;
