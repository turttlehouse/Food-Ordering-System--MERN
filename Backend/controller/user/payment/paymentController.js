const axios = require("axios")
const Order = require("../../../model/orderSchema")
const User = require("../../../model/userModel")

exports.initiatekhaltiPayment = async(req,res)=>{

    const { orderId, amount } = req.body

    if(!orderId || !amount)
    {
        return res.status(400).json({
            message : "Please provide OrderId,Amount"
        })
    }

    let order = await Order.findById(orderId)

    if(!order)
    {
        return res.status(404).json({
            message : "Order not found with that Id"
        })

    }

    if(order.totalAmount !== amount)
    {
        return res.status(404).json({
            message : "Amount must be equal to total amount"
        })
    }    

     const data = {

        return_url : "http://localhost:5173/success", 
        purchase_order_id : orderId,
        amount : amount * 100,
        website_url : "http://localhost:5000/",
        purchase_order_name : "orderName_" + orderId
    }

    const response = await  axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data,{

        headers : {
            'Authorization' : 'Key 8ab82c9e35124608898626cc16078849'
        }

    })

    order.paymentDetails.pidx = response.data.pidx

    await order.save();

    res.status(200).json({
        message : "payment successful",
        paymentUrl : response.data.payment_url
    })

}


exports.verifyPidx = async(req,res)=>{

    const pidx = req.body.pidx;

    const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/",{pidx:pidx},{
        headers :{
            'Authorization' : 'key 8ab82c9e35124608898626cc16078849'
        }
    })

    if(response.data.status == 'Completed')
    {
    
        let order = await Order.find({'paymentDetails.pidx' : pidx})

        order[0].paymentDetails.method = 'khalti'
        order[0].paymentDetails.status = 'paid'

        await order[0].save()

        const userId = req.user.id;
        const user = await User.findById(userId)
        user.cart = []
        await user.save();

        res.status(200).json({
            message : "Payment verified Successfully"
        })

    }

}

