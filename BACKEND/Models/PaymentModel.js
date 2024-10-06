const mongoose = require('mongoose'); // Make sure to import mongoose

const paymentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    cardHolderName: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: String,
        required: true,
    },
    expires: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    },
   
});

// Export the model
const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
