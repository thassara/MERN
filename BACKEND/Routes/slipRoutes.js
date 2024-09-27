const express = require('express');
const router = express.Router();
const slipController = require('../controllers/slipController');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Upload a new slip
router.post('/add', upload.single('slipFile'), slipController.uploadSlip);

// Retrieve all slips
router.get('/', slipController.getSlips);

// Update a slip by ID
router.put('/:id', slipController.updateSlip);

// Delete a slip by ID
router.delete('/:id', slipController.deleteSlip);

module.exports = router;
