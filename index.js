// index.js

const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

// Create an Express application
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Define routes
app.use('/doctors', require('./routes/doctorRoutes'));
app.use('/patients', require('./routes/patientRoutes'));
app.use('/reports', require('./routes/reportRoutes'));

// Define a default route
app.get('/', (req, res) => {
  res.send('Welcome to the hospital API!');
});

// Set up the server to listen on a port
const PORT = process.env.PORT || 3000; // Default port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
