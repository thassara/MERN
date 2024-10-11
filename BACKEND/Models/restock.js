const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restockSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    measurement: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true,
    }
});

const Restock = mongoose.model("Restock", restockSchema);

module.exports = Restock;