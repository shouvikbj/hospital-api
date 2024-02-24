// routes/patientRoutes.js

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const patientController = require('../controllers/patientController');

// Route: POST /patients/register
// Description: Register a new patient
router.post(
  '/register',
  [
    check('name', 'Name is required').notEmpty(),
    check('phoneNumber', 'Phone number is required').notEmpty().isMobilePhone('any', { strictMode: false })
  ],
  patientController.register
);

module.exports = router;
