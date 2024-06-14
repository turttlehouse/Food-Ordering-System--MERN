const User = require("../../../model/userModel");
const bcrypt = require("bcryptjs")

exports.getMyProfile = async(req,res)=>{
    const userId = req.user.id;

    const myProfile = await User.findById(userId);

    res.status(200).json({
        message:"profile fetched successfully",
        data : myProfile

    })
}


exports.updateMyProfile = async(req,res)=>{
    const {userName,userEmail,userPhoneNumber} = req.body
    const userId = req.user.id;

    const updatedData = await User.findByIdAndUpdate(userId,{
            userName,
            userEmail,
            userPhoneNumber
        },
        {
            runValidators:true,
            new : true  
        }
    )

    res.status(200).json({
        message: "Profile Updated Successfully",
        data : updatedData
    })
}


exports.deleteMyProfile = async(req,res)=>{
    const userId = req.user.id
    await User.findByIdAndDelete(userId)
    res.status(200).json({
        message:"profile deleted successfully",
        data : null
    })
}


exports.updateMyPassword =async(req,res)=>{
    const userId = req.user.id;

    const {oldPassword,newPassword,confirmPassword} = req.body;
    if(!oldPassword || !newPassword || !confirmPassword)
    {
        return res.status(400).json({
            message : "please provide oldPassword,newPassword,confirmPassword"
        })
    }

    if(newPassword !== confirmPassword)
    {
        return res.status(400).json({
            message : "new password and old password does not match"
        })
    }

    const userData = await User.findById(userId)

    const hashedOldPassword = userData.userPassword

    const isOldPasswordCorrect = bcrypt.compareSync(oldPassword,hashedOldPassword)

    if(!isOldPasswordCorrect)
    {
        return res.status(400).json({
            message: " old password didn't match"
        })
    }


    userData.userPassword = bcrypt.hashSync(newPassword,12)

    await userData.save()
    
    res.status(200).json({
        message:"password changed successfully"
    })


}