const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderqueueSchema = new Schema({
    orderid : {
        type : String,
        required : true
    },
    priority:{
        type: Number,
        required : true
    }
    


})

const Orderqueue = mongoose.model("Orderqueue",orderqueueSchema);
module.exports = Orderqueue; 