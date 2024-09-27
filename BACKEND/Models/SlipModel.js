const mongoose = require('mongoose');

const slipSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: true,
    },
    remark: {
        type: String,
        default: '',
    },
    slipFile: {
        type: String, // Store the path to the file
        required: true,
    },
}, { timestamps: true });

const Slip = mongoose.model('Slip', slipSchema);

module.exports = Slip;
