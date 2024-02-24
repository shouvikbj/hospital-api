// routes/doctorRoutes.js

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const doctorController = require('../controllers/doctorController');

// Route: POST /doctors/register
// Description: Register a new doctor
router.post(
  '/register',
  [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty().isLength({ min: 6 })
  ],
  doctorController.register
);

// Route: POST /doctors/login
// Description: Login for doctors
router.post(
  '/login',
  [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty()
  ],
  doctorController.login
);

module.exports = router;
