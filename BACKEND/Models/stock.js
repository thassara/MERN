const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    alrtQty: {
        type: Number,
        required: true
    },
    measurement: {
        type: String,
        required: true
    },
    availableQty: {  
        type: Number,
        required: true,
        default: 0  
    }
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
