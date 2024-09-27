const Slip = require('../models/slipModel'); // Make sure to adjust the path

exports.uploadSlip = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    
    const { bankName, remark } = req.body; // Extract other form data from req.body
    const slipData = new Slip({
        bankName,
        remark,
        slipFile: req.file.path, // Save the path to the uploaded file
    });

    slipData.save()
        .then(() => res.status(201).json({ message: 'Slip uploaded successfully!', data: slipData }))
        .catch(err => res.status(500).json({ message: 'Error uploading slip', error: err }));
};

exports.getSlips = (req, res) => {
    Slip.find()
        .then(slips => res.json(slips))
        .catch(err => res.status(500).json({ message: 'Error retrieving slips', error: err }));
};

exports.updateSlip = (req, res) => {
    const { id } = req.params;
    Slip.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedSlip => {
            if (!updatedSlip) {
                return res.status(404).json({ message: 'Slip not found' });
            }
            res.json(updatedSlip);
        })
        .catch(err => res.status(500).json({ message: 'Error updating slip', error: err }));
};

exports.deleteSlip = (req, res) => {
    const { id } = req.params;
    Slip.findByIdAndDelete(id)
        .then(deletedSlip => {
            if (!deletedSlip) {
                return res.status(404).json({ message: 'Slip not found' });
            }
            res.json({ message: 'Slip deleted successfully' });
        })
        .catch(err => res.status(500).json({ message: 'Error deleting slip', error: err }));
};
