const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    Cus_name: { type: String, required: true },
    Cus_email: { type: String, required: true },
    qty: { type: Number, required: true },
    package_type: { type: String, required: true },
    Cus_note: { type: String },
    status: { type: String },
    Or_tracking: { type: String },
    Location: { type: String, required: true }, // New field
    IssueDate: { type: Date, required: true },  // New field
    DeliveryDate: { type: Date, required: true },  // New field
});

module.exports = mongoose.model('Order', orderSchema);
