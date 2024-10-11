const orderService = require('../service/orders');

class OrderController {
    async createOrder(req, res) {
        try {
            const order = await orderService.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getOrderById(req, res) {
        try {
            const order = await orderService.getOrderByID(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    

    async updateOrder(req, res) {
        try {
            const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteOrder(req, res) {
        try {
            await orderService.deleteOrder(req.params.id);
            res.status(200).json({ message: "Order deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new OrderController();
