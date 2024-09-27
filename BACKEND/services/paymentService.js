const Payment = require('../Models/PaymentModel');

class PaymentService {
  async createPayment(data) {
    try {
      const newPayment = new Payment(data);
      await newPayment.save();
      return newPayment;
    } catch (error) {
      throw new Error('Error processing payment: ' + error.message);
    }
  }

  async getPayments() {
    try {
      return await Payment.find();
    } catch (error) {
      throw new Error('Error retrieving payments: ' + error.message);
    }
  }

  async updatePayment(id, updates) {
    try {
      const updatedPayment = await Payment.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedPayment) {
        throw new Error('Payment not found');
      }
      return updatedPayment;
    } catch (error) {
      throw new Error('Error updating payment: ' + error.message);
    }
  }

  async deletePayment(id) {
    try {
      const deletedPayment = await Payment.findByIdAndDelete(id);
      if (!deletedPayment) {
        throw new Error('Payment not found');
      }
      return deletedPayment;
    } catch (error) {
      throw new Error('Error deleting payment: ' + error.message);
    }
  }
}

module.exports = new PaymentService();
