const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueDeliverySchema = new Schema({
  OrderId: { type: Number, required: true },
  TotalQty: { type: Number, required: true },
  TotalAmt: { type: Number, required: true },
  IssueDate: { type: Date, default: Date.now },
  DeliveryDate: { type: Date },
  Status: { type: String, required: true },
});

module.exports = mongoose.model('IssueDelivery', issueDeliverySchema);
