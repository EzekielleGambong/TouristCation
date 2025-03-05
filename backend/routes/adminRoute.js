import express from 'express';
import { User } from '../models/userModels.js';
import { Accommodationinformation } from '../models/accommodationModels.js';
import { Attractioninformation } from '../models/tourists.js';
const router = express.Router();

// Get total user count
router.get('/total-users', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total users", error });
  }
});
router.get('/total-tourist', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const totalTourist = await Attractioninformation.countDocuments({}); // Assuming `Tourist` is your model
    res.status(200).json({ totalTourist });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total tourists", error });
  }
});
router.get('/total-acco', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const totalAccommodations = await Accommodationinformation.countDocuments({}); // Assuming `Tourist` is your model
    res.status(200).json({ totalAccommodations });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total tourists", error });
  }
});  
export default router;