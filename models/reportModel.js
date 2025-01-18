const mongoose = require('mongoose');

// Define the report schema
const reportSchema = new mongoose.Schema({
  issue: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  profURL: {
    type: String,
    required: false, 
    default:null// Optional field
  },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
}, { timestamps: true });

// Create the model
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
