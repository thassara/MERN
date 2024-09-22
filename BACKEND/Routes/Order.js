const express = require('express');
<<<<<<< Updated upstream
const router = express.Router();
const orderController = require('../controllers/OrderControllers'); // Adjust path if needed

// Define routes (use actual routes and methods from your order controller)
router.post('/add', orderController.createOrder);
router.get('/Allread', orderController.getAllOrders);
router.get('/read/:id', orderController.getOrderById);
router.put('/update/:id', orderController.updateOrder);
router.delete('/delete/:id', orderController.deleteorder);
=======
const orderController = require('../controllers/OrderControllers');
const router = express.Router();

// Routes for CRUD operations
router.post('/orders/add', orderController.createOrder);
router.get('/orders/Allread', orderController.getAllOrders);
router.get('/orders/read/:id', orderController.getOrderById);
router.put('/orders/update/:id', orderController.updateOrder);
router.delete('/orders/delete/:id', orderController.deleteorder);
>>>>>>> Stashed changes

module.exports = router;
