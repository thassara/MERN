const express = require('express');
const attendanceController = require('../controllers/attendanceController'); // Import the controller
const router = express.Router();

// POST: Add a new attendance record
router.post('/AddAttendance', attendanceController.addAttendance);

// GET: Retrieve all attendance records
router.get('/GetAttendance', attendanceController.getAllAttendance);

// GET: Retrieve a single attendance record by AttID
router.get('/attendance/:attId', attendanceController.getAttendanceById);

// DELETE: Delete an attendance record by AttID
router.delete('/DelAttendance/:AttID', attendanceController.deleteAttendanceById);

// PUT: Update attendance record by EmpID and WorkDate
router.put('/attendance/:empId/:workDate', attendanceController.updateAttendanceByIdAndDate);

module.exports = router;
