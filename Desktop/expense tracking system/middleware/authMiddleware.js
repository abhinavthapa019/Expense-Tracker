require("dotenv").config();

const jwt = require("jsonwebtoken");

function authenticatetoken(req, res, next) {
    // Read the Authorization header
    const authHeader = req.headers.authorization;

    // Check if the header exists
    if (!authHeader) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    // Header format: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Check if token exists after "Bearer"
    if (!token) {
        return res.status(401).json({
            message: "Invalid token format."
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store decoded payload for later use
        req.user = decoded;

        // Continue to next middleware/controller
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
}

module.exports = authenticatetoken;