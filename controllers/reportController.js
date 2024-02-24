// controllers/reportController.js

const Report = require('../models/Report');
const { validationResult } = require('express-validator');

// Controller for creating a new report for a patient
exports.createReport = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { createdBy, status } = req.body;
  const patientId = req.params.id; // Extract patient ID from route parameter

  try {
    // Create a new report instance
    const report = new Report({
      createdBy,
      patient: patientId,
      status
    });

    // Save the report to the database
    await report.save();

    res.status(200).json({ msg: 'Report created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Controller for fetching all reports of a patient
exports.getAllReports = async (req, res) => {
  const patientId = req.params.id; // Extract patient ID from route parameter

  try {
    // Fetch all reports for the specified patient ID
    const reports = await Report.find({ patient: patientId }).sort({ date: 'asc' });

    res.status(200).json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Controller for fetching all reports by status
exports.getReportsByStatus = async (req, res) => {
  const status = req.params.status; // Extract status from route parameter

  try {
    // Fetch all reports with the specified status
    const reports = await Report.find({ status });

    res.status(200).json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
