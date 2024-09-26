const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  // _id:{
  //   type:String
  // },
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Expense', ExpenseSchema);
