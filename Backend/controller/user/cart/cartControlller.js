const Product = require("../../../model/productModel");
const User = require("../../../model/userModel");

exports.addToCart = async(req,res)=>{

    const userId = req.user.id;

    const { productId } = req.params

    if(!productId)
    {
        return res.status(400).json({
            message: "Please provide the product id"
        })
    }

    const ProductExist = await Product.findById(productId);

    if(!ProductExist)
    {
        return res.status(400).json({
            message: "No Product with that Product Id"
        })
    }

    const user = await User.findById(userId)

    const existingCartItem = user.cart.find((item)=>item.product.equals(productId))

    if(existingCartItem)
    {
        existingCartItem.quantity +=1;

    }
    else{
        user.cart.push({
            product:productId,
            quantity :1  
        })
    }

    await user.save();

    const updatedUser = await User.findById(userId).populate('cart.product');

    res.status(200).json({
        message : "product added to cart",
        data : updatedUser.cart
    })

}


exports.getMyCartItems = async(req,res)=>{

    const userId = req.user.id;
    const userData = await User.findById(userId).populate({  
        path : "cart.product",
        select : "-productStatus"
    })

    return res.status(200).json({
        message : "cart Item Fetched Successfully",
        data : userData.cart

    })
}


exports.deleteItemFromCart = async(req,res)=>{
    const userId = req.user.id;
    const {productId} =req.params;

    const product = await Product.findById(productId)
    if(!product)
    {
        return res.status(404).json({
            message: "no product with that productId"
        })
    }

    const user = await User.findById(userId);

    user.cart = user.cart.filter(item=>item.product != productId)

    await user.save();

    res.status(200).json({
        message : "Items removed from the cart"
    })

}





//multiple delete garnu paro vane
// exports.deleteItemFromCart = async(req,res)=>{
//     const userId = req.user.id;
//     const {productId} =req.params;

//     //for multiple delete
//     const {productIds} = req.body;

//     //check if product with that Product Id exist or not
//     const product = await Product.findById(productId)
//     if(!product)
//     {
//         return res.status(404).json({
//             message: "no product with that productId"
//         })
//     }

//     //get userData
//     const user = await User.findById(userId);
//     // console.log(user);
//     // console.log(user.cart);
    
//     //user ko cart vanne field ma filter gareko naya array halne
//     //logic k xa vane jun product id ako xa tyo bhaek aru id return gardinxa naya array ma
//     //original array = [1,2,3] ==>2 ==>filter ==>[1,3]
//     // user.cart = user.cart.filter((pId)=>{
//     //    return pId != productId
//     // })

//     //OR one line huda curly braces nadiyera shorthand garda ni vayo
//     // user.cart = user.cart.filter(pId=>pId != productId)



//     //FOR MULTIPLE DELETE
//     productIds.forEach((productIdd)=>{
//         user.cart = user.cart.filter(pId=>pId != productIdd)

//     })       

//     //database ma persist garna ko lagi
//     await user.save();

//     //sending response
//     res.status(200).json({
//         message : "Items removed from the cart"
//     })

// }



exports.updateCartItems = async(req,res)=>{
    
    const userId = req.user.id;

    const { productId } = req.params;

    const { quantity } = req.body;

    const user = await User.findById(userId);

    // console.log(user);
    const cartItem = user.cart.find((item)=>item.product.equals(productId));

    if(!cartItem){
        return res.status(404).json({
            message : "No item with that Id"
        })
    }

    cartItem.quantity = quantity;

    await user.save();

    res.status(200).json({
        message : "Item Updated Successfully",
        data : user.cart
    })
}
