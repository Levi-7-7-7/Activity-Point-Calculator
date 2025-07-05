const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'tutor'], default: 'student' },
  totalPoints: { type: Number, default: 0 },
 registerNumber: { type: String },
  rollNumber: { type: String },
});


module.exports = mongoose.model('User', userSchema);
