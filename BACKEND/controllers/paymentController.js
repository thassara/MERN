const Payment = require('../Models/PaymentModel');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const paymentData = new Payment(req.body); // Create a new payment instance
    await paymentData.save(); // Save to MongoDB
    res.status(201).send({ message: 'Payment added successfully!', payment: paymentData });
  } catch (error) {
    console.error('Error saving payment data:', error);
    res.status(400).send({ message: 'Failed to add payment', error: error.message });
  }
};

// Get all payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find(); // Fetch all payments
    res.status(200).send(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).send({ message: 'Failed to retrieve payments' });
  }
};

// Update a payment by ID
exports.updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(updatedPayment);
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(400).send({ message: 'Failed to update payment' });
  }
};

// Delete a payment by ID
exports.deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(400).send({ message: 'Failed to delete payment' });
  }
};
