// controllers/doctorController.js

const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Function to register a new doctor
exports.register = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Check if the doctor already exists
    let doctor = await Doctor.findOne({ username });

    if (doctor) {
      return res.status(400).json({ msg: 'Doctor already exists' });
    }

    // Create a new doctor instance
    doctor = new Doctor({
      username,
      password
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    doctor.password = await bcrypt.hash(password, salt);

    // Save the doctor to the database
    await doctor.save();

    res.status(200).json({ msg: 'Doctor registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Function to log in a doctor
exports.login = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Check if the doctor exists
    let doctor = await Doctor.findOne({ username });

    if (!doctor) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create and return JWT token
    const payload = {
      doctor: {
        id: doctor.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
