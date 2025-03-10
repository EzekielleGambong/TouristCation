  import express from 'express';
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
  import { User } from '../models/userModels.js';
  import { upload } from "../middlewares/MulterMiddleware.js"; 
  import { Accommodationinformation } from '../models/accommodationModels.js';
  import { Attractioninformation } from '../models/tourists.js';
 
  import dotenv from 'dotenv';
  dotenv.config();

  const router = express.Router();
  const JWT_SECRET = '51933b8a4f51b73a5d9308eebc7f4012357eadc9de1e811a88ba915394f1464f170b92131ae5fe6d5b9b38784aba6b1e2b21e77325b92e2ecdf4cfcf1f1b37a2';

  // In-memory token blacklist and activity tracker
  const tokenBlacklist = new Set();
  const userActivity = new Map();

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

      // Check if user is inactive
      if (userActivity.has(decoded.id) && Date.now() - userActivity.get(decoded.id) > 3600000) { // 1 minute inactivity
        return res.status(403).json({ message: 'Session locked due to inactivity' });
      }

      // Update user activity
      userActivity.set(decoded.id, Date.now());
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
      const {
        fname, lname, email, password, role, adminKey, address, region,
        city, country, zip, phonenumber, photo = '',
        typeOfAttractions = '', category = '', travelStylePrediction = '',
        storeTypePreference = '', average_price_range = 0, 
        ambiance = '', popularity = '', foodPrediction = ''
      } = req.body;

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
        fname,
        lname,
        email,
        password: hashedPassword,
        role: role || "user", // Default to "user" if no role is provided
        address,
        region,
        city,
        country,
        zip,
        phonenumber,
        photo,
        typeOfAttractions,
        category,
        travelStylePrediction,
        average_price_range,
        ambiance,
        foodPrediction,
        popularity,
        storeTypePreference,
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
      
      // Send additional user info to check for empty fields
      res.status(200).json({
        token,
        role: user.role,
        user: {
          travelStylePrediction: user.travelStylePrediction,
          averagePricePreference: user.averagePricePreference,
          averagePriceShopPreference: user.averagePriceShopPreference
        }
      });
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
    
    // Debugging log
    console.log("Blacklisted tokens:", tokenBlacklist);

    userActivity.delete(req.user.id); // Remove user activity tracking
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

  // Track user activity
  router.post('/activity', authenticateJWT, (req, res) => {
    userActivity.set(req.user.id, Date.now());
    res.status(200).json({ message: 'Activity updated' });
  });

  // Unlock session
  router.post('/unlock', authenticateJWT, async (req, res) => {
    const { password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    userActivity.set(req.user.id, Date.now()); // Reset activity timer
    res.status(200).json({ message: 'Session unlocked' });
  });

  // Update user profile (Now protected with authenticateJWT)
  router.put("/profile", authenticateJWT, async (req, res) => {
    try {
        console.log("Updating profile for user:", req.user.id);
        console.log("Request body:", req.body);

        const userId = req.user.id;
        const updateData = {
          ...req.body,
          average_price_range: Number(req.body.average_price_range) // Convert to number
      };

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, select: "-password" }
        );

        if (!updatedUser) {
            console.log("User not found:", userId);
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Profile updated successfully:", updatedUser);
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
});

// Predict Travel Style and Update Profile
router.put("/travel", authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the token
    const { typeOfAttractions, category } = req.body[0]; // Assuming an array is sent

    // Dummy logic for travel style prediction (replace with actual AI model or logic)
    const predictedTravelStyle = `Traveler interested in ${typeOfAttractions} and ${category}`;

    // Update the user's travel style prediction
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { travelStylePrediction: predictedTravelStyle },
      { new: true, select: "-password" } // Exclude password from response
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Travel style updated", travelStylePrediction: predictedTravelStyle });
  } catch (error) {
    res.status(500).json({ message: "Error predicting travel style", error });
  }
});

  router.post("/upload", authenticateJWT, upload.single("photo"), async (req, res) => {
    try {
      const userId = req.user.id; // Extract user ID from JWT
      const imageUrl = `/uploads/${req.file.filename}`; // Image path

      // Update user profile with image URL
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { photo: imageUrl },
        { new: true }
      );

      res.status(200).json({ message: "Profile picture updated", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error uploading image", error });
    }
  });

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