const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Create a new payment
router.post('/add', paymentController.createPayment);

// Get all payments
router.get('/', paymentController.getPayments);

// Update a payment by ID
router.put('/:id', paymentController.updatePayment);

// Delete a payment by ID
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
