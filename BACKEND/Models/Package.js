const mongoose = require('mongoose'); // Import Mongoose to create the schema and model

const Schema = mongoose.Schema; // Define Schema for mongoose

// Define the schema for the Package model
const packageSchema = new Schema({
    PackageName: { type: String, required: true },          // Name of the package (Required)
    PackageType: { type: String, required: true },          // Type of package (Required)
    PackageDescription: { type: String },                   // Description of the package (Optional)
    Material: { type: String, required: true },             // Material of the package (Required)
    Length: { type: Number, required: true },               // Length of the package (in number, Required)
    Width: { type: Number, required: true },                // Width of the package (in number, Required)
    Height: { type: Number, required: true }                // Height of the package (in number, Required)
});

// Create a Mongoose model from the schema
// The first argument is the name of the model (i.e., 'Package')
// Mongoose will pluralize this name to create the 'packages' collection in the database
const Package = mongoose.model('Package', packageSchema);

// Export the model to use it in other parts of the application
module.exports = Package;
