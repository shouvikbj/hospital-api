// controllers/patientController.js

const Patient = require('../models/Patient');
const { validationResult } = require('express-validator');

// Controller for registering a new patient
exports.register = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { phoneNumber, name } = req.body;

  try {
    // Check if the patient already exists
    let patient = await Patient.findOne({ phoneNumber });

    if (patient) {
      return res.status(400).json({ msg: 'Patient already exists' });
    }

    // Create a new patient instance
    patient = new Patient({
      phoneNumber,
      name
    });

    // Save the patient to the database
    await patient.save();

    res.status(200).json({ msg: 'Patient registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
