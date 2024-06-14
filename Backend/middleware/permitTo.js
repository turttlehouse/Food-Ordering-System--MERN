
const permitTo = (...roles)=>{

    return (req,res,next)=>{

        const userRole = req.user.role

        if(roles.includes(userRole))
        {
           

            next()
        }
        else{

            res.status(403).json({
                message: "you don't have permission for this .forbidden"
            })
        }
    }

}

module.exports = permitTo