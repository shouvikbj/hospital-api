// config/jwt.js

require('dotenv').config();
const jwt = require('jsonwebtoken');

// JWT secret key from environment variable
const jwtSecret = process.env.JWT_SECRET;

// Function to generate JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' }); // Expires in 1 hour
};

// Function to verify JWT token
const verifyToken = (token, callback) => {
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, decoded);
  });
};

module.exports = {
  generateToken,
  verifyToken
};
