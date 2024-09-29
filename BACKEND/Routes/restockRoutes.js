const express = require('express');
const router = express.Router();
const itemController = require('../controllers/restockCtrl');

router.post('/add', itemController.createRestock);
router.get('/all', itemController.getAllRestock);
router.get('/get/:id', itemController.getRestockByID);
router.put('/update/:id', itemController.updateRestock);
router.delete('/delete/:id', itemController.deleteRestock);

module.exports = router;