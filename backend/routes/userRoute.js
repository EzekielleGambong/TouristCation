import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModels.js';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();
const JWT_SECRET = '51933b8a4f51b73a5d9308eebc7f4012357eadc9de1e811a88ba915394f1464f170b92131ae5fe6d5b9b38784aba6b1e2b21e77325b92e2ecdf4cfcf1f1b37a2';

// In-memory token blacklist (for simplicity)
const tokenBlacklist = new Set();

// Middleware to verify token and check blacklisted tokens
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Check if token is blacklisted
  if (tokenBlacklist.has(token)) {
    return res.status(403).json({ message: 'Token is blacklisted' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check user roles
const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, adminKey } = req.body;

    // Ensure only users with a valid adminKey can sign up as admin
    if (role === "admin" && adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ message: "Unauthorized to create admin account" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // Default to "user" if no role is provided
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Log In
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Log Out
router.post('/logout', authenticateJWT, (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }
  // Add token to blacklist
  tokenBlacklist.add(token);
  res.status(200).json({ message: 'Logged out successfully' });
});

// Fetch user profile
router.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example Admin-only Route
router.get('/admin-data', authenticateJWT, authorizeRole('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome to the admin dashboard!' });
});

export default router;
