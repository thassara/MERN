const Order = require('../Models/Order');

// Create a new order
const createOrder = async (orderData) => {
    const order = new Order(orderData);
    return await order.save();
};

// Get all orders
const getAllOrders = async () => {
    return await Order.find();
};

// Get order by ID
const getOrderByID = async (id) => {
    return await Order.findById(id);
};

// Update an order by ID
const updateOrder = async (id, updatedData) => {
    return await Order.findByIdAndUpdate(id, updatedData, { new: true });
};

// Delete an order by ID
const deleteOrder = async (id) => {
    return await Order.findByIdAndDelete(id);
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderByID,
    updateOrder,
    deleteOrder,
};
