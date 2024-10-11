const items = require('../Models/stock'); 

class itemServices {
    // Create a new item
    async createitem(itemData) {
        try {
            return await items.create(itemData);
        } catch (error) {
            throw new Error(`Error creating item: ${error.message}`);
        }
    }

    // Get all items
    async getAllitem() {
        try {
            return await items.find();
        } catch (error) {
            throw new Error(`Error fetching items: ${error.message}`);
        }
    }

    // Get an item by its ID
    async getitemByID(id) {
        try {
            return await items.findById(id);
        } catch (error) {
            throw new Error(`items with ID ${id} not found: ${error.message}`);
        }
    }

    // Update an item by its ID
    async updateitem(id, updateData) {
        try {
            return await items.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw new Error(`Error updating item with ID ${id}: ${error.message}`);
        }
    }

    // Delete an item by its ID
    async deleteitem(id) {
        try {
            return await items.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting item with ID ${id}: ${error.message}`);
        }
    }

    // Check if an item exists by its name
    async checkItem(itemName) {
        try {
            return await items.findOne({ itemName });
        } catch (error) {
            throw new Error(`Error checking item existence: ${error.message}`);
        }
    }

    // Update the available quantity of an item by its name
    async updateQuantityByName(itemName, quantity) {
        try {
            // Decrement the availableQty by the quantity provided
            return await items.findOneAndUpdate(
                { itemName },
                { $inc: { availableQty: quantity } },  
                { new: true }  
            );
        } catch (error) {
            throw new Error(`Error updating quantity for item: ${error.message}`);
        }
    }
}

module.exports = new itemServices();