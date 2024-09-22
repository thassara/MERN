// routes/employeeRoutes.js
const express = require('express');
const EmployeeProfile = require('../Models/EmployeeProfile'); // Correct import
const router = express.Router();

// POST: Add a new employee
router.post('/AddEmployee', async (req, res) => {
  try {
    const newEmployee = new EmployeeProfile(req.body); // Use EmployeeProfile instead of Employee
    await newEmployee.save();
    res.status(201).send('Employee added successfully');
  } catch (error) {
    console.error('Error adding employee in the routes section:', error); // Log the error
    res.status(400).send('Error adding employee: ' + error.message);
  }
});

// GET: Retrieve all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await EmployeeProfile.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send('Error retrieving employees: ' + error.message);
  }
});

module.exports = router;
