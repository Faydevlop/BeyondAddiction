const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  isGuest: {
    type: Boolean,
    default:false
    
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
