const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderControllers'); // Adjust path if needed

// Define routes (use actual routes and methods from your order controller)
router.post('/add', orderController.createOrder);
router.get('/Allread', orderController.getAllOrders);
router.get('/read/:id', orderController.getOrderById);
router.put('/update/:id', orderController.updateOrder);
router.delete('/delete/:id', orderController.deleteorder);

module.exports = router;
