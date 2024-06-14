const Order = require("../../../model/orderSchema");
const Product = require("../../../model/productModel");
const fs = require("fs")


exports.createProduct = async(req,res)=>{

    const file = req.file

    let filePath;
    
    if(!file)
    {
        filePath="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdCUyMGltYWdlfGVufDB8fDB8fHww"
    }
    else{
        filePath = req.file.filename
    }

    const { productName,productDescription,productPrice,productStatus,productStockQty} = req.body;
    if (!productName || !productDescription || !productPrice || !productStatus || !productStockQty)
        return res.status(400).json({
            message : "please provide productName,productDescription,productPrice,productStatus,productStockQty"
        })

    const productCreated = await Product.create({
        productName,
        productDescription,
        productPrice,
        productStatus,
        productStockQty,
        productImage: process.env.BACKEND_URL + filePath
     })   
     res.status(200).json({
        message:"product created successfully",
        data : productCreated
     })
   
}


exports.deleteProduct = async(req,res)=>{
    const {id} = req.params

    if(!id)
    {
        return res.status(400).json({
            message:"please provide the product id"
        })
    }




        const oldData = await Product.findById(id);
        if(!oldData)
        {
            return res.status(404).json({
                message:"no data found with that id"
            })
        }

      const oldProductImage = oldData.productImage   
      const lengthToCut = process.env.BACKEND_URL.length;
      const finalFilePathAfterCut = oldProductImage.slice(lengthToCut)


    if(req.file && req.file.filename)
    {
        fs.unlink("./uploads/" + finalFilePathAfterCut,(err)=>{
            if(err)
            {
                console.log("errro deleteing file",err)
            }
            else{
                console.log("file deleted successfully")

            }
        })
    }
  
    await Product.findByIdAndDelete(id)
    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })

}

exports.editProduct = async(req,res)=>{
   
    const {id} = req.params

    const { productName,productDescription,productPrice,productStatus,productStockQty} = req.body;

    if (!productName || !productDescription || !productPrice || !productStatus || !productStockQty)
    return res.status(400).json({
        message : "please provide all fields"
    })

    const oldData = await Product.findById(id);
    if(!oldData)
    {
        return res.status(404).json({
            message:"no data found with that id"
        })
    }
  

    const oldProductImage = oldData.productImage   
    const lengthToCut = process.env.BACKEND_URL.length;
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut)

    if(req.file && req.file.filename)
    {
        fs.unlink("./uploads/" + finalFilePathAfterCut,(err)=>{
            if(err)
            {
                console.log("errro deleteing file",err)
            }
            else{
                console.log("file deleted successfully")

            }
        })
    }
    
    const datas = await Product.findByIdAndUpdate(id,{
        productName,
        productDescription,
        productPrice,
        productStatus,
        productStockQty,
        productImage: req.file && req.file.filename ? process.env.BACKEND_URL + req.file.filename : oldProductImage
    },{
        new:true,
        runValidators: true
    })

    return res.status(200).json({
        message:"product updated successfully",
        data : datas
    })


}


exports.updateProductStatus = async(req,res)=>{

    const {id} = req.params

    const {productStatus} = req.body

    if(!productStatus || !['available','unavailable'].includes(productStatus.toLowerCase()))
    {
        return res.status(400).json({
            message : "Product status is invalid or should be provided"
        })
    }

    const product = await Product.findById(id)
    if(!product)
    {
        return res.status(404).json({
            message : "No product found with that id"
        })
    }

    const updatedProduct = await Product.findByIdAndUpdate(id,{
        productStatus
    },{new:true})


    res.status(200).json({
        message : "product status updated Successfully",
        data : updatedProduct
    })
}

exports.updateProductStockAndPrice = async(req,res)=>{
    const {id} = req.params;

    const {productStockQty,productPrice} = req.body

    if(!productStockQty && !productPrice)
    {
        return res.status(400).json({
            message : "please provideStockQty or productPrice"
        })
    }    
    
    const product = await Product.findById(id)
    if(!product)
    {
        return res.status(404).json({
            message : "No product found with that id"
        })
    }

    const updatedProduct = await Product.findByIdAndUpdate(id,{

        productStockQty : productStockQty ? productStockQty : product.productStockQty,
        productPrice : productPrice ? productPrice : product.productPrice

    },{new:true})

    res.status(200).json({
        message : "product status updated successfully",
        data : updatedProduct
    })
}


exports.getOrdersOfAProduct = async(req,res)=>{
    
    const {id : productId} = req.params

    const product = await Product.findById(productId)

    if(!product)
    {
        return res.status(404).json({
            message : "No product Found"
        })
    }

    const orders = await Order.find({'items.product' : productId})

    res.status(200).json({
        message : "Product Orders fetched",
        data : orders
    })
}  