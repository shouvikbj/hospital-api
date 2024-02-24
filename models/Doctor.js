// models/Doctor.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const DoctorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Hash the password before saving the doctor
DoctorSchema.pre('save', async function (next) {
  const doctor = this;
  if (doctor.isModified('password')) {
    doctor.password = await bcrypt.hash(doctor.password, 10);
  }
  next();
});

// Method to compare passwords
DoctorSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Doctor', DoctorSchema);
