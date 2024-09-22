const express = require('express');
const AttendanceProfile = require('../Models/Attendance');
const router = express.Router();

// POST: Add a new attendance record
router.post('/AddAttendance', async (req, res) => {
    try {
        const newAttendance = new AttendanceProfile(req.body);
        await newAttendance.save();
        res.status(201).send('Attendance added successfully');
    } catch (error) {
        console.error('Error adding attendance:', error);
        res.status(400).send('Error adding attendance: ' + error.message);
    }
});

// GET: Retrieve all attendance records
router.get('/GetAttendance', async (req, res) => {
    console.log('GetAttendance route hit'); // Log the request
    try {
        const attendanceRecords = await AttendanceProfile.find();
        console.log('Fetched records:', attendanceRecords); // Log fetched records
        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).send('Error fetching attendance records: ' + error.message);
    }
});


// GET: Retrieve a single attendance record by EmpID
router.get('/:empId', async (req, res) => {
    try {
        const attendanceRecord = await AttendanceProfile.findOne({ EmpID: req.params.empId });
        if (!attendanceRecord) {
            return res.status(404).send('Attendance record not found');
        }
        res.status(200).json(attendanceRecord);
    } catch (error) {
        console.error('Error fetching attendance record:', error);
        res.status(500).send('Error fetching attendance record: ' + error.message);
    }
});

// DELETE: Delete an attendance record by EmpID
router.delete('/:empId', async (req, res) => {
    try {
        const deletedRecord = await AttendanceProfile.findOneAndDelete({ EmpID: req.params.empId });
        if (!deletedRecord) {
            return res.status(404).send('Attendance record not found');
        }
        res.status(200).send('Attendance record deleted successfully');
    } catch (error) {
        console.error('Error deleting attendance record:', error);
        res.status(500).send('Error deleting attendance record: ' + error.message);
    }
});

module.exports = router;
