const Product = require("../../model/productModel")
const Review = require("../../model/reviewSchema")


exports.getProducts = async(req,res)=>{

    const products = await Product.find()

    if(products.length ==0)
    {
        res.status(400).json({
            message: "No products Found",
            data :[]
        })
    }

    else{
        res.status(200).json({
            message:"products fetched successfully",
            data : products
        })
    }

}


exports.getProduct = async(req,res)=>{

    const {id} = req.params
    
    if(!id)
    {
        return res.status(400).json({
            message:"please provide id (product Id)"
        })
    }   


    const product = await Product.find({_id: id})

        const productReviews = await Review.find({productId:id}).populate("userId").populate("productId")


    if(product.length == 0)
    {
        res.status(400).json({
            message : "no product found with that id",
        data:{
            data :[],
            data2 :[]

        } 

        })
    }
    else{
        res.status(200).json({
            message:"product fetched successfully",
            data: {product,
                    productReviews}
        })
    }

}