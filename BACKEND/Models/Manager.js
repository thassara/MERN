const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  ManagerID: { type: Number, required: true },
  ManagerName: { type: String, required: true },
  ManagerRole: { type: String, required: true },
  ManagerPassKey: { type: Number,  required: true }
});

module.exports = mongoose.model('Manager', managerSchema);