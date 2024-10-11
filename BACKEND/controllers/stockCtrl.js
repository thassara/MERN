const itemServices = require("../services/stockServices");

class itemController {
  async createitem(req, res) {
      try {
          // Check if an item with the same name already exists
          const existingItem = await itemServices.checkItem(req.body.itemName);
          
          if (existingItem) {
              return res.status(400).json({ message: "Item with this name already exists" });
          }
          
          // Proceed to create the item if it does not exist
          const item = await itemServices.createitem(req.body);
          res.status(201).json(item);
      } catch (error) {
          res.status(400).json({ message: error.message });
      }
  }

  async checkItem(req, res) {
      try {
          const item = await itemServices.checkItem(req.query.itemName); 
          res.status(200).json({ exists: !!item }); 
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  }

  async getAllitems(req, res) {
      try {
          const items = await itemServices.getAllitem();
          res.status(200).json(items);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  }

  async updateitem(req, res) {
      try {
          const item = await itemServices.updateitem(req.params.id, req.body);
          if (!item) {
              return res.status(404).json({ message: "item Not Found" });
          }
          res.status(200).json(item);
      } catch (error) {
          res.status(400).json({ message: error.message });
      }
  }

  async deleteitem(req, res) {
      try {
          const item = await itemServices.deleteitem(req.params.id);
          if (!item) {
              return res.status(404).json({ message: "item Not Found" });
          }
          res.status(200).json({ message: "item deleted successfully" });
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  }

  // Update available quantity by itemName
  async updateQuantityByName(req, res) {
    const { itemName } = req.params;
    const { quantity } = req.body;  

    try {
        const updatedItem = await itemServices.updateQuantityByName(itemName, quantity);
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new itemController();