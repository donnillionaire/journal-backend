const jwt = require("jsonwebtoken");

// Middleware function to protect routes
const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const token = req.header("Authorization");

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request object
    next(); // Move to next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
