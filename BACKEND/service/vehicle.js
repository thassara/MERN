const Vehicle = require('../Models/VehicleModels');

class VehicleService {

    async createVehicle(vehicleData) {
        const newVehicle = new Vehicle(vehicleData);
        return await newVehicle.save();
    }

    async getAllVehicles() {
        return await Vehicle.find();
    }

    async getVehicleById(vehicleId) {
        return await Vehicle.findById(vehicleId);
    }

    async updateVehicle(vehicleId, updateData) {
        return await Vehicle.findByIdAndUpdate(vehicleId, updateData, { new: true });
    }

    async deleteVehicle(vehicleId) {
        return await Vehicle.findByIdAndDelete(vehicleId);
    }
}

module.exports = new VehicleService();
