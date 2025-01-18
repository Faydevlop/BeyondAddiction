const mongoose = require('mongoose');

// Define the report schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },

}, { timestamps: true });

// Create the model
const Report = mongoose.model('Admin', adminSchema);

module.exports = Report;
