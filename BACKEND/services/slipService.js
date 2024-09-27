const Slip = require('../Models/SlipModel');

class SlipService {
  async uploadSlip(data) {
    try {
      const newSlip = new Slip(data);
      await newSlip.save();
      return newSlip;
    } catch (error) {
      throw new Error('Error uploading slip: ' + error.message);
    }
  }

  async getSlips() {
    try {
      return await Slip.find();
    } catch (error) {
      throw new Error('Error retrieving slips: ' + error.message);
    }
  }

  async updateSlip(id, updates) {
    try {
      const updatedSlip = await Slip.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedSlip) {
        throw new Error('Slip not found');
      }
      return updatedSlip;
    } catch (error) {
      throw new Error('Error updating slip: ' + error.message);
    }
  }

  async deleteSlip(id) {
    try {
      const deletedSlip = await Slip.findByIdAndDelete(id);
      if (!deletedSlip) {
        throw new Error('Slip not found');
      }
      return deletedSlip;
    } catch (error) {
      throw new Error('Error deleting slip: ' + error.message);
    }
  }
}

module.exports = new SlipService();
