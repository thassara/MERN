const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//gggs
const studentSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    age:{
        type: Number,
        required : true
    },
    gender:{
        type:String,
        required:true
    }
})

const Student = mongoose.model("Student",studentSchema);
module.exports = Student; 

//ebjsb d
