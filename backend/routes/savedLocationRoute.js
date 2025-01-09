import express from 'express';
import jwt from 'jsonwebtoken';
import { SavedLocation } from '../models/savedLocationModels.js';
import { User } from '../models/userModels.js';

const router = express.Router();
const JWT_SECRET = 'your_secret_key';

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Create Saved Location
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newLocation = await SavedLocation.create({ user: req.user.id, title, description });
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Saved Locations (Admin sees all, user sees own)
router.get('/', authenticate, async (req, res) => {
  try {
    const locations = req.user.role === 'admin'
      ? await SavedLocation.find().populate('user', 'name email')
      : await SavedLocation.find({ user: req.user.id });

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
