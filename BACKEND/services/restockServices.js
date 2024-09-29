const restock = require('../Models/restock');

class restockServices {
  async createRestock(restockData) {
    try {
      return await restock.create(restockData);
    } catch (error) {
      throw new Error(`Error creating restock: ${error.message}`);
    }
  }

  async getAllRestock() {
    try {
      return await restock.find();
    } catch (error) {
      throw new Error(`Error fetching restock: ${error.message}`);
    }
  }

  async getRestockByID(id) {
    try {
      return await restock.findById(id);
    } catch (error) {
      throw new Error(`Restock with ID ${id} not found: ${error.message}`);
    }
  }

  async updateRestock(id, updateData) {
    try {
      return await restock.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(`Error updating restock with ID ${id}: ${error.message}`);
    }
  }

  async deleteRestock(id) {
    try {
      return await restock.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting restock with ID ${id}: ${error.message}`);
    }
  }
}

module.exports = new restockServices();
