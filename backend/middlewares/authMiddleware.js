import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = '51933b8a4f51b73a5d9308eebc7f4012357eadc9de1e811a88ba915394f1464f170b92131ae5fe6d5b9b38784aba6b1e2b21e77325b92e2ecdf4cfcf1f1b37a2';


// Middleware to verify token and check blacklisted tokens
const tokenBlacklist = new Set();
const userActivity = new Map();

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if token is blacklisted
  if (tokenBlacklist.has(token)) {
    return res.status(403).json({ message: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    // Check for inactivity (1 hour timeout)
    if (userActivity.has(decoded.id) && Date.now() - userActivity.get(decoded.id) > 3600000) {
      return res.status(403).json({ message: "Session locked due to inactivity" });
    }

    // Update activity
    userActivity.set(decoded.id, Date.now());
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Middleware to check user roles
export const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// Export tokenBlacklist and userActivity for other routes
export { tokenBlacklist, userActivity };
