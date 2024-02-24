// routes/reportRoutes.js

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const reportController = require('../controllers/reportController');

// Route: POST /patients/:id/create_report
// Description: Create a new report for a patient
router.post(
  '/:id/create_report',
  [
    check('createdBy', 'Doctor ID is required').notEmpty(),
    check('status', 'Status is required').notEmpty()
  ],
  reportController.createReport
);

// Route: GET /patients/:id/all_reports
// Description: Get all reports of a patient
router.get('/:id/all_reports', reportController.getAllReports);

// Route: GET /reports/:status
// Description: Get all reports by status
router.get('/:status', reportController.getReportsByStatus);

module.exports = router;
