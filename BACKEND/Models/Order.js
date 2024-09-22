const mongoose = require("mongoose");

const Order = new mongoose.Schema({
    Cus_name:{
        type: String,
        required: true,
    },
    Cus_email:{
        type: String,
        required: true,
    },
    qty:{
        type: String,
        required: true,
    },
    package_type:{
        type: String,
        required: true,
    },
    Cus_note:{
        type: String,
        
    }
})

const OR = mongoose.model("OR",Order);
module.exports=OR;