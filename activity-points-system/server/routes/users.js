// routes/users.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// 🔐 Middleware protects all routes below
// 🔍 1. Get all students (for tutor)
router.get('/all-students', auth, async (req, res) => {
  try {
    if (req.user.role !== 'tutor') {
      return res.status(403).json({ msg: 'Access denied. Tutors only.' });
    }

    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ rollNumber: 1 }) // Sort by rollNumber ascending
     //populate('certificates'); // Optional: populate certificates if using refs

    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});


// ✏️ 2. Update student profile (rollNumber + registerNumber)
router.put('/update-profile', auth, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ msg: 'Only students can update profile' });
    }

    const { rollNumber, registerNumber } = req.body;

    if (!rollNumber || !registerNumber) {
      return res.status(400).json({ msg: 'Both roll number and register number are required' });
    }

    // Check for duplicate roll number
    const existingRoll = await User.findOne({ rollNumber });
    if (existingRoll && existingRoll._id.toString() !== req.user.userId) {
      return res.status(400).json({ msg: 'Roll number already exists' });
    }

    // Check for duplicate register number
    const existingReg = await User.findOne({ registerNumber });
    if (existingReg && existingReg._id.toString() !== req.user.userId) {
      return res.status(400).json({ msg: 'Register number already exists' });
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { rollNumber, registerNumber },
      { new: true }
    );

    res.json({ msg: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
