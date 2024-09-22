const or_service= require("../services/orders");

class OrderController {

    async createOrder(req,res){
        try{
            const order = await or_service.createOrder(req.body);
            res.status(201).json(order);
        }catch(error){
            res.status(400).json({message:error.message});
        }
    }

    async getAllOrders(req,res){
        try{
            const order = await or_service.getAllOrders();
            res.status(200).json(order);
        }catch(error){
            res.status(500).json({message:error.message});
        }
    }

    async getOrderById(req,res){
        try{
            const order = await or_service.getOrderByID(req.params.id);
            if(!order){
                return res.status(404).json({message:"Order is Not Found"});
                res.status(200).json(order);
            }
        }catch(error){
             res.status(500).json({message:error.message});   
        }
    }

    async updateOrder(req,res){
        try{
            const order = await or_service.updateOrder(
                req.params.id,
                req.body
            );
            if(!order){
                return res.status(404).json({message:"Order is not Found"});
                res.status(200).json(order);
            }
        }catch(error){
            res.status(400).json({message:error.message});
    }
    }

    async deleteorder(req,res){
        try{
            const order = await or_service.deleteOrder(req.params.id);
            if(!order){
                return res.status(404).json({message:"Order not Found"});
                res.status(200).json({message:"Order delete successfully"});
            }
        }catch(error){
            res.status(500).json({message:error.message});
        }
    }
    
}

module.exports= new OrderController();