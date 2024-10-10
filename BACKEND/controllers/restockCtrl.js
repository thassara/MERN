const restockServices = require('../services/restockServices');

class restockCtrl {
    async createRestock(req, res) {
        try {
            const restockData = req.body;
            const restock = await restockServices.createRestock(restockData);
            res.status(201).json(restock);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllRestock(req, res) {
        try {
            const restock = await restockServices.getAllRestock();
            res.status(200).json(restock);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getRestockByID(req, res) {
        try {
            const { id } = req.params;
            const restock = await restockServices.getRestockByID(id);
            res.status(200).json(restock);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async updateRestock(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const restock = await restockServices.updateRestock(id, updateData);
            res.status(200).json(restock);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteRestock(req, res) {
        try {
            const { id } = req.params;
            const restock = await restockServices.deleteRestock(id);
            res.status(200).json(restock);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new restockCtrl();