const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const packageSchema = new Schema ({
    
    PackageName: { type: String, required: true },
    PackageType: { type: String, required: true },
    PackageDescription: { type: String },
    Material: { type: String, required: true },
    Dimensions: { type: Number, required: true },
    

});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;