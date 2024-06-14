const User = require("../../../model/userModel")

exports.getUsers = async(req,res)=>{

    const userId = req.user.id
    console.log(userId);

    const users = await User.find().select("-__v");

    if(users.length > 1)
    {
        res.status(200).json({
            message: "users fetched successfully",
            data:users
        })
    }
    else
    {
        res.status(404).json({
            message:"users in the collection is empty",
            data:[]

        })
    }
}


exports.deleteUser = async(req,res)=>{
    const userId = req.params.id
    if(!userId)
    {
        return res.status(400).json({
            message:"please provide the userId"
        })
    }

    const user = await User.findById(userId);

    if(!user)
    {
        res.status(400).json({
            
            message:"user not found with that UserId"

        })
    }
    else{
        await User.findByIdAndDelete(userId)
        res.status(200).json({
            message:"user deleted successfully"
        })
    }
}



















































