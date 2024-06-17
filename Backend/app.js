require("dotenv").config()
const express = require("express")
const { connectDatabase } = require("./database/database")
const app = express()

connectDatabase(process.env.MONGO_URI)

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const cors = require("cors")

app.use(cors({
    
    origin : '*',

}))

const authRoute = require("./routes/auth/authRoute")
const productRoute = require("./routes/admin/productRoute")
const adminUsersRoute = require("./routes/admin/adminUsersRoute")
const userReviewRoute = require("./routes/user/userReviewRoute")
const profileRoute = require("./routes/user/profileRoute")
const cartRoute = require("./routes/user/cartRoute")
const orderRoute = require("./routes/user/orderRoute")
const adminOrderRoute = require("./routes/admin/adminOrderRoute")
const paymentRoute = require("./routes/user/paymentRoute")
const dataServiceRoute = require("./routes/admin/dataServiceRoute")


app.get('/',(req,res)=>{
    res.status(200).json({
        message: " I am alive"
    })
})

app.use("/api/auth",authRoute)
app.use("/api/products",productRoute)
app.use("/api/admin",adminUsersRoute)
app.use("/api/admin",adminOrderRoute)
app.use("/api/reviews",userReviewRoute)
app.use("/api/profile",profileRoute)
app.use("/api/cart",cartRoute)
app.use("/api/orders",orderRoute)
app.use("/api/payment",paymentRoute)
app.use("/api/admin",dataServiceRoute)


app.use(express.static("./uploads"))

const port = process.env.PORT

//Web Socket Implementation
const server = app.listen(port,(req,res)=>{
    console.log(`your project has started at ${port}`);
})

const { Server } = require("socket.io");

const io = new Server(server,{
    cors : "http://localhost:3000"
})

io.on("connection",(socket)=>{

    socket.on("hello",(data)=>{
        console.log(data.name);
    })
    
    console.log("someone is trying to connect")
})


