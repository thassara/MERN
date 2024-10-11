const Orderqueue= require('../Models/orderqueue'); // Ensure the path is correct.


class orderqueueServices{

    async createorder(orderData) {
        return await Orderqueue.create(orderData);
    }

    async getAllorders(){
        return await Orderqueue.find();
    }

    async getorderByID(id){
        return await Orderqueue.findById(id);
    } 

    async updateorder(id,updateData){
        return await Orderqueue.findByIdAndUpdate(id,updateData);

    }

    async deleteorder(id){
        return await Orderqueue.findByIdAndDelete(id);
    }

}
module.exports = new orderqueueServices();