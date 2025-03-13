  import express from 'express';
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
  import { User } from '../models/userModels.js';
  import { upload } from "../middlewares/MulterMiddleware.js"; 
  import { Accommodationinformation } from '../models/accommodationModels.js';
  import { Attractioninformation } from '../models/tourists.js';
  import { Itinerary } from "../models/itineraryModel.js";
  import nodemailer from 'nodemailer';
  import otpGenerator from 'otp-generator';


  import dotenv from 'dotenv';
  dotenv.config();

  const OTPStore = new Map();
  // Email Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

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
  
  router.post("/send-otp", async (req, res) => {
    console.log("Received req.body:", req.body); // Debugging line

    const { email, role } = req.body;
    console.log("Extracted email:", email); // Debugging line

    try {
        let recipientEmail = email; // Default: normal user

        // If admin, override with the fixed admin email
        if (role === "admin") {
            recipientEmail = process.env.ADMIN_EMAIL;
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: recipientEmail });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Generate OTP
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        console.log("Generated OTP:", otp);

        // Store OTP with expiration
        OTPStore.set(recipientEmail, { otp, expiresAt: Date.now() + 300000 }); // 5 min expiry
        console.log("OTP stored for", recipientEmail, ":", OTPStore.get(recipientEmail));

        // Send OTP email
        try {
            const info = await transporter.sendMail({
                from: process.env.EMAIL, // Sender email
                to: recipientEmail, // Sends to either user or admin email
                subject: "TouristCation OTP Code",
                html: `
                    <p>Dear ${role === "admin" ? "Admin" : "User"},</p>
                
                    <p>Thank you for your request!</p>
                
                    <p>Your One-Time Password (OTP) code is:</p>
                
                    <p><strong>${otp}</strong></p>
                
                    <p>Please enter this code in the appropriate field to proceed with your transaction.</p>
                
                    <p><em>Note:</em> This OTP code will expire in 10 minutes for security purposes. If you did not request this code, please disregard this email.</p>
                
                    <p>If you need any assistance, feel free to contact our support team at <a href="mailto:support@touristcation.com">support@touristcation.com</a>.</p>
                
                    <p>Best regards,<br> The TouristCation Team</p>
                
                    <p><em>For security reasons, do not share your OTP with anyone. Always make sure you are on the official website or app before entering sensitive information.</em></p>
                `,
            });

            console.log("Email sent successfully:", info.response);
            return res.status(200).json({ message: "OTP sent to email" });

        } catch (emailError) {
            console.error("Email sending error:", emailError);
            return res.status(500).json({ message: "Failed to send OTP email" });
        }

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

  
  // ✅ Step 2: Verify OTP and Create Account
  router.post('/verify-otp', async (req, res) => {
    try {
        const {
            fname, lname, email, password, role, adminKey, address, region,
            city, country, phonenumber, photo = '',
            typeOfAttractions = '', category = '', travelStylePrediction = '',
            storeTypePreference = '', average_price_range = 0,
            ambiance = '', popularity = '', foodPrediction = '', barangay = '',
            otp
        } = req.body;

        console.log("Received OTP verification request:", { email, otp, role });

        // Use the correct email for OTP lookup
        let recipientEmail = email;
        if (role === "admin") {
            recipientEmail = process.env.ADMIN_EMAIL;
        }

        // Check OTP
        const storedOTP = OTPStore.get(recipientEmail);
        console.log(`Stored OTP for ${recipientEmail}:`, storedOTP);

        if (!storedOTP) {
            return res.status(400).json({ message: "OTP expired or not found" });
        }

        console.log("Received OTP:", otp, "Stored OTP:", storedOTP?.otp, "Expires at:", storedOTP?.expiresAt);

        if (storedOTP.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (Date.now() > storedOTP.expiresAt) {
            OTPStore.delete(recipientEmail);
            return res.status(400).json({ message: "OTP expired" });
        }

        // Ensure only users with a valid adminKey can sign up as admin
        if (role === "admin" && adminKey !== process.env.ADMIN_KEY) {
            return res.status(403).json({ message: "Unauthorized to create admin account" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fname,
            lname,
            email,
            password: hashedPassword,
            role: role || "user",
            address,
            region,
            city,
            country,
            phonenumber,
            photo,
            typeOfAttractions,
            category,
            travelStylePrediction,
            average_price_range,
            ambiance,
            foodPrediction,
            popularity,
            barangay,
            storeTypePreference,
        });

        console.log("User registered:", newUser.email);
            
        // Remove OTP after verification
        OTPStore.delete(recipientEmail);

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).json({ message: error.message });
    }
});


  // Sign Up
  router.post('/signup', async (req, res) => {
    try {
      const {
        fname, lname, email, password, role, adminKey, address, region,
        city, country, phonenumber, photo = '',
        typeOfAttractions = '', category = '', travelStylePrediction = '',
        storeTypePreference = '', average_price_range = 0, 
        ambiance = '', popularity = '', foodPrediction = '', barangay = ''
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
        phonenumber,
        photo,
        typeOfAttractions,
        category,
        travelStylePrediction,
        average_price_range,
        ambiance,
        foodPrediction,
        popularity,
        barangay,
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


router.post("/save_itinerary", authenticateJWT, async (req, res) => {
  try {
      const {
          userId,
          province,
          noOfTravellers,
          stayPeriodFrom,
          stayPeriodTo,
          touristSpots,
          shops
      } = req.body;

      // Check required fields
      if (!userId || !province || !noOfTravellers || !stayPeriodFrom || !stayPeriodTo || !touristSpots.length || !shops.length) {
          return res.status(400).json({ error: "Missing required fields" });
      }

      const itinerary = new Itinerary(req.body);
      await itinerary.save();
      res.status(201).json({ message: "Itinerary saved successfully!" });
  } catch (error) {
      console.error("Error saving itinerary:", error);
      res.status(500).json({ error: "Failed to save itinerary", details: error.message });
  }
});

  

  export default router;