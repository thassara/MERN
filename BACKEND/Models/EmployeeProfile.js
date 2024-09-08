const mongoose = require('mongoose');

const employeeProfileSchema = new mongoose.Schema({
  EmpID: { type: Number, required: true },
  EmpName: { type: String, required: true },
  EmpFullName: { type: String, required: true },
  EmpAddress: { type: String, required: true },
  EmpQualifications: { type: String },
  EmpExperiance: { type: String },
  EmpPosition: { type: String, required: true },
  EmpWage: { type: Number, required: true },
  EmpJoin: { type: Date, required: true },
  EmpPassKey: { type: Number, required: true }
});

const EmployeeProfile = mongoose.model('EmployeeProfile', employeeProfileSchema);

module.exports = EmployeeProfile;
