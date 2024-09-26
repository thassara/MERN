const mongoose = require('mongoose');

const PmProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number, // Corrected to Number (capitalized)
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Add any other fields or relationships here if needed
});

module.exports = mongoose.model('PmProfile', PmProfileSchema);
