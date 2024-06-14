const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/userModel");
const sendEmail = require("../../services/sendEmail");

exports.registerUser = async(req,res)=>{

    const {email,password,phonenumber,username} = req.body

    if(!email || !password || !phonenumber){
        return res.status(400).json({
            message:"please include all data(email,pass,phone no) in all fields"
    })}

    const userFound = await User.find({userEmail:email})
    if(userFound.length>0)
    return res.status(400).json({
        message:"user Already Registered"
    })

    const userData = await User.create({
        userName : username,
        userEmail: email,
        userPhoneNumber : phonenumber,
        userPassword : bcrypt.hashSync(password,12)
    })

    res.status(201).json({
        message: "user registered successfully",
        data : userData
    })

    
 
 }


exports.loginUser = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password)
    {
        return res.status(400).json({
            message :"Please provide email,password",
            
        })
    }

    const userFound = await User.find({userEmail:email})
    if (userFound.length == 0){

        return res.status(404).json({
            message : "user with that email is  not Registerd"
        })

    }

    const isMatched = bcrypt.compareSync(password,userFound[0].userPassword)

    if(isMatched){

        const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY,
            { expiresIn: '20d' });



        res.status(200).json({
            message : "user logged in successfully",
            data : userFound,
            token : token
        })
    }

    else{
        res.status(404).json({
            message : "invalid email or password"
        })
    }
}



exports.forgotPassword  = async(req,res)=>{
    const {email} = req.body;
    if(!email)
    {
        return res.status(400).json({
            message:"please provide email"
        })
    }

    const userExist = await User.find({userEmail : email})

    if(userExist.length == 0){
        return res.status(404).json({
            message : " email is not registered"
        })
    }

    const otp =Math.floor( Math.random() *9000);

    userExist[0].otp = otp;
    await userExist[0].save();
    await sendEmail({
        email : email,
        subject : "namaste nepal",
        text : `${otp},Don't share this with anyone`
    })
    res.status(200).json({
        message : "OTP Sent Successfully",
        data : email
    })

} 




exports.verifyotp = async(req,res)=>{
    const { email,otp }= req.body;

    if(!email || !otp )
    {
        return res.status(400).json({
            message:"please provide both email and otp"
        })
    }


    const userExists = await User.find({userEmail:email}).select("+otp +OtpVerified")
    if (userExists.length ==0)
    {
        return res.status(404).json({
            message:"email is not registered"
        })
    }

    if(userExists[0].otp !== otp*1)
    {
        res.status(400).json({
            message:"Invalid OTP"
        })
    }
    else{

        userExists[0].otp=undefined

        userExists[0].isOtpVerified = true;

        await userExists[0].save()

        res.status(200).json({
            message:"your otp is correct"
        })
    }
}


exports.resetpassword = async(req,res)=>{


    const { email,newPassword,confirmPassword} = req.body

    if (!email || !newPassword || !confirmPassword) 
    {
        return res.status(400).json({
            message:"please provide email,newPassword,confirmPassword"
        })
    }

    if(newPassword !== confirmPassword)
    {
        return res.status(400).json({
            message:"password and confirm password didnot match"
        })
    }

    const userExist = await User.find({userEmail:email}).select("+isOtpVerified")

    if (userExist.length == 0)
    {
        return res.status(404).json({
            message:"email not registered"
        })
    }

    if(userExist[0].isOtpVerified !== true)
    {
        return res.status(403).json({
            message:"You cannot Perform this action"
        })

    }
    
    userExist[0].userPassword = bcrypt.hashSync(newPassword,10)

   
    userExist[0].isOtpVerified = false;

    await userExist[0].save()
    return res.status(200).json({
        message:"password changed successfully"
    })
}