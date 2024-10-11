const machine = require('../Models/Machine'); // Ensure the path is correct.


class machinerServices{

    async createmachine(machineData) {
        return await machine.create(machineData);
    }

    async getAllmachines(){
        return await machine.find();
    }

    async getmachineByID(id){
        return await machine.findById(id);
    } 

    async updatemachine(id,updateData){
        return await machine.findByIdAndUpdate(id,updateData);

    }

    async deletemachine(id){
        return await machine.findByIdAndDelete(id);
    }

}
module.exports = new machinerServices();