const mongoose = require('mongoose');

// Define the schema for Vehicle
const vehicleSchema = new mongoose.Schema({
  vehicleId: {type: String,required: true,unique: true,},
  name: {type: String,required: true,},
  type: {type: String,required: true,},
  registrationNumber: {type: String,required: true,unique: true,},
  status: {type: String,enum: ['Available', 'Unavailable', 'maintenance'],default: 'Available'},
  capacity: {type: Number,required: true,},
  lastServiceDate: {type: Date,default: Date.now,},
  nextServiceDate: {type: Date,required: true,},
  createdAt: {type: Date,default: Date.now,},});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
