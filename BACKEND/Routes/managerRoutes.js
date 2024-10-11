const express = require('express');
const ManagerProfile = require('../Models/Manager');
const router = express.Router();

//Login route
router.get('/login/:ManagerID/:ManagerPassKey/:ManagerRole', async (req, res) => {
    const { ManagerID, ManagerPassKey, ManagerRole } = req.params;
  
    try {
      //Ensure that ManagerID and ManagerPassKey are of correct type
      const manager = await ManagerProfile.findOne({
        ManagerID: Number(ManagerID), // Convert to Number
        ManagerPassKey: Number(ManagerPassKey), // Convert to Number
        ManagerRole: ManagerRole
      });
  
      if (manager) {
        res.status(200).json({ message: 'Login successful', manager });
      } else {
        res.status(401).json({ message: 'Invalid credentials or role' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
module.exports = router;