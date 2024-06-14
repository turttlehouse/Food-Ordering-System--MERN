
const Product = require("../../../model/productModel");
const Review = require("../../../model/reviewSchema")



exports.createReview = async(req,res)=>{
    const userId = req.user.id;

    const { rating,message }= req.body;
    const productId = req.params.id;

    if(!rating || !message || !productId)
    {
        return res.status(400).json({
            message:"please provide rating ,message ,productId"
        })
    }

    const productExist = await Product.findById(productId)
    if(!productExist)
    {
        return res.status(400).json({
            message:"product with that Productid does not exist"
        })
    }

    await Review.create({
        userId : userId,
        productId : productId,
        rating :rating,
        message
    })

    res.status(200).json({
        message:"Review Added Successfully"
    })


}


exports.getMyReview = async(req,res)=>{
    const userId = req.user.id;
    const reviews = await Review.find({userId:userId})
    if(reviews.length ==0)
    {
        res.status(400).json({
            message:"you haven't give review to any products yet",
            reviews:[]

        })
    }
    else
    {
        res.status(200).json({
            message:"Review fetched Successfully",
            data : reviews
        })
    }
}


exports.deleteReview = async(req,res)=>{
    const reviewId = req.params.id;

    if(!reviewId)
    {
        return res.status(400).json({
            message : "Please Provide the Review Id"
        })
    }

    const userId = req.user.id;

    const review = Review.findById(reviewId)

    const ownerIdOfReview = review.userId;

    if(ownerIdOfReview !== userId)
    {
        return res.status(400).json({
            message:"you don't have permission to delete this review"
        })
    }

    await Review.findByIdAndDelete(reviewId)
    res.status(200).json({
        message:"Review Deleted Successfully"
    })
}