const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const User = require('../models/User');

// Upload certificate (Student)
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const { title, level } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;

    const cert = new Certificate({
      student: req.user.userId,
      title,
      level,
      fileUrl
    });

    await cert.save();
    res.status(201).json({ msg: 'Certificate uploaded', certificate: cert });
  } catch (err) {
    res.status(500).json({ msg: 'Upload failed', error: err.message });
  }
});


//Approve or Reject Certificates.
router.put('/review/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'tutor') {
      return res.status(403).json({ msg: 'Only tutors can approve/reject' });
    }

    const { action, comment } = req.body; // action = 'approve' or 'reject'
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({ msg: 'Certificate not found' });
    }

    if (certificate.status !== 'pending') {
      return res.status(400).json({ msg: 'Certificate already reviewed' });
    }

    let points = 0;
    if (action === 'approve') {
      if (certificate.level === 'state') points = 10;
      else if (certificate.level === 'national') points = 20;
      else if (certificate.level === 'international') points = 30;

      certificate.status = 'approved';
      certificate.points = points;
    } else if (action === 'reject') {
      certificate.status = 'rejected';
    } else {
      return res.status(400).json({ msg: 'Invalid action' });
    }

    certificate.tutorComment = comment;
    await certificate.save();

    // Update student’s total points if approved
    if (action === 'approve') {
      await User.findByIdAndUpdate(certificate.student, {
        $inc: { totalPoints: points }
      });
    }

    res.json({ msg: `Certificate ${action}d`, certificate });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating certificate', error: err.message });
  }
});


// GET all certificates for the logged-in student
router.get('/my-certificates', auth, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ msg: 'Only students can view their certificates' });
    }

    const certificates = await Certificate.find({ student: req.user.userId }).sort({ createdAt: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch certificates', error: err.message });
  }
});



//get the certificates.
router.get('/pending', auth, async (req, res) => {
  try {
    if (req.user.role !== 'tutor') {
      return res.status(403).json({ msg: 'Access denied. Only tutors allowed.' });
    }

    const pendingCerts = await Certificate.find({ status: 'pending' }).populate('student', 'name email totalPoints');
    res.json(pendingCerts);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching certificates', error: err.message });
  }
});

const fs = require('fs');
const path = require('path');

// DELETE a certificate by ID (only if owned by student & pending)
router.delete('/:id', auth, async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ msg: 'Certificate not found' });

    // Only student who uploaded it can delete
    if (cert.student.toString() !== req.user.userId) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    // Only allow deletion if still pending
    if (cert.status !== 'pending') {
      return res.status(400).json({ msg: 'Cannot delete after review' });
    }

    // Delete the file from uploads
    const filePath = path.join(__dirname, '..', cert.fileUrl);
    fs.unlink(filePath, err => {
      if (err) console.error('File deletion error:', err);
    });

    await cert.deleteOne();
    res.json({ msg: 'Certificate deleted' });

  } catch (err) {
    res.status(500).json({ msg: 'Deletion failed', error: err.message });
  }
});

// routes/certificates.js
router.get('/student/:id', auth, async (req, res) => {
  if (req.user.role !== 'tutor') return res.status(403).json({ msg: 'Forbidden' });

  const certs = await Certificate.find({ student: req.params.id }).populate('student', 'name email');
  res.json(certs);
});

// routes/certificates.js
router.get('/notifications', auth, async (req, res) => {
  if (req.user.role !== 'tutor') return res.status(403).json({ msg: 'Forbidden' });

  const recent = await Certificate.find({ status: 'pending' })
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('student', 'name email');

  res.json(recent);
});



module.exports = router;

