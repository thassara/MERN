const IssueDelivery = require('../Models/IssueDelivery');

exports.getAllIssueDeliveries = async (req, res) => {
  try {
    const deliveries = await IssueDelivery.find();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deliveries' });
  }
};

exports.getIssueDeliveryById = async (req, res) => {
  try {
    const delivery = await IssueDelivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.status(200).json(delivery);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching delivery' });
  }
};

exports.createIssueDelivery = async (req, res) => {
  try {
    const newDelivery = new IssueDelivery(req.body);
    const savedDelivery = await newDelivery.save();
    res.status(201).json(savedDelivery);
  } catch (error) {
    res.status(400).json({ message: 'Error creating delivery' });
  }
};

exports.updateIssueDelivery = async (req, res) => {
  try {
    const updatedDelivery = await IssueDelivery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.status(200).json(updatedDelivery);
  } catch (error) {
    res.status(400).json({ message: 'Error updating delivery' });
  }
};

exports.deleteIssueDelivery = async (req, res) => {
  try {
    const deletedDelivery = await IssueDelivery.findByIdAndDelete(req.params.id);
    if (!deletedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.status(200).json({ message: 'Delivery deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting delivery' });
  }
};
