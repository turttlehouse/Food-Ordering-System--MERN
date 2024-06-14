const Order = require("../../../model/orderSchema");
const User = require("../../../model/userModel");

exports.createOrder = async(req,res)=>{

    const userId = req.user.id;

    const {shippingAddress,items,phoneNumber,totalAmount,paymentDetails} = req.body

    if(!shippingAddress || !items.length >0 || !totalAmount || !paymentDetails || !phoneNumber)
    {
        return res.status(400).json({
            message : "please provide shipping address,items,totalamount,paymentdetails,phoneNumber"
        })
    }

    const createdOrder = await Order.create({
        user : userId,
        shippingAddress,
        items,
        totalAmount,
        paymentDetails,
        phoneNumber
    })


    const user = await User.findById(userId)
    user.cart = []
    await user.save();



    res.status(200).json({
        message : "Order created Successfully",
        data : createdOrder 
    })

}

exports.getMyOrders = async(req,res)=>{

    const userId = req.user.id;

    const orders = await Order.find({user:userId}).populate({
        path : "items.product",
        model : "Product",
        select : ["-productStockQty","-createdAt","-updatedAt","-__v","-reviews"]
    })

    res.status(200).json({
        message : "Orders fetched Successfully",
        data : orders
    })

}


exports.updateMyOrder = async(req,res)=>{

    const userId = req.user.id;

    const {id} = req.params

    const {shippingAddress,items} = req.body

    if(!shippingAddress || !items)
    {
        return res.status(404).json({
            message : "please provide shipping Address,items"
        })
    }

    const existingOrder = await Order.findById(id)

    if(!existingOrder)
    {
        return res.status(404).json({
            message : "No order with that id"
        })
    }

    
    if(existingOrder.user !== userId)
    {
        return res.statu(403).json({
            message : "you dont have permission to update this order"
        })
    }

    if(existingOrder.orderStatus == "ontheway")
    {
        return res.status(400).json({
            message : "you cannot update the order when it is on the way"
        })
    }

    const updatedOrder = await Order.findByIdAndUpdate(id,{
        shippingAddress,
        items
    },{
        new : true
    })


    return res.status(200).json({
        message : "Ordder Updated Successfully",
        data : updatedOrder
    })


}

//delete Order
exports.deleteMyOrder = async(req,res)=>{

    const userId = req.user.id;

    const {id} = req.params

    const order = await Order.findById(id)

    if(!order)
    {
        return res.status(400).json({
            message :"No Order with that id"
        })
    }

    if(order.user != userId)
    {
        return res.status(400).json({
            message : "you don't have permission to delete this order"
        })
    }

    if(order.orderStatus !== "pending")
    {
        return res.status(400).json({
            message : "you cannot delete this order as it is not pending"
        })
    }    

    await Order.findByIdAndDelete(id)
    res.status(200).json({
        message : "Order deleted successfully",
        data : null
    })
}

exports.cancelOrder = async(req,res)=>{

    const userId = req.user.id;

    const {id} = req.body

    const order = await Order.findById(id);

    if(!order)
    {
        return res.status(404).json({
            message : "No Order with that id"
        })
    }

    if(order.user != userId)
    {
        return res.status(400).json({
            message : "you don't have permission to cancel this order"
        })
    }

    if(order.orderStatus!== "pending")
    {
        return res.status(400).json({
            message : "you cannot cancel this order as it is not in pending status"
        })
    }

    const updatedOrder = await Order.findByIdAndUpdate(id,{
        orderStatus : "cancelled"
    })

    res.status(200).json({
        message : "Order Cancelled successfully",
        data : updatedOrder
    })




}