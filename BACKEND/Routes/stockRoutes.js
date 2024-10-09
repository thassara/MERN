const express = require('express');
const router = express.Router();
const itemController = require('../controllers/stockCtrl');

router.post('/add', itemController.createitem);
router.get('/all', itemController.getAllitems);
router.put('/update/:id', itemController.updateitem);
router.delete('/delete/:id', itemController.deleteitem);
router.get('/check', itemController.checkItem);
router.put('/updateQuantity/:itemName', itemController.updateQuantityByName);  

module.exports = router;
