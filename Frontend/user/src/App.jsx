
import './App.css'
import {  BrowserRouter, RouterProvider,Routes,Route} from 'react-router-dom'
import Cart from './pages/cart/Cart'
import router from './router'
import Navbar from './globals/components/navbar/Navbar'
import Footer from './globals/components/footer/Footer'
import {Provider} from "react-redux"
import store from './store/store'
import Home from './pages/home/Home'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import CheckOut from './pages/checkout/CheckOut'
import KhaltiSuccess from './pages/success/KhaltiSuccess'
import UserProfile from './pages/profile/UserProfile'
import MyOrders from './pages/myOrders/MyOrders'
import OrderDetails from './pages/orderDetails/OrderDetails'
import ForgotPassword from './pages/auth/forgotPassword/ForgotPassword'
import VerifyOtp from './pages/auth/verifyOtp/VerifyOtp'
import ResetPassword from './pages/auth/resetPassword/ResetPassword'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//ws
import {io} from "socket.io-client"

export const socket = io("http://localhost:5000",{
   auth :{

      token :  localStorage.getItem("token")

   } 
})





function App() {


  return (
    <>

    <Provider store = {store} >
    <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path = '/' element = {<Home/>}/>
      <Route path="/login" element={<Login />} />
      <Route path ='/register' element={<Register/>}/>
      <Route path = '/cart' element = {<Cart/>}/>
      <Route path ='/productdetails/:id' element={<ProductDetails/>} />
      <Route path = '/checkout' element={<CheckOut/>}/>
      <Route path = '/success' element={<KhaltiSuccess/>}/>
      <Route path = '/profile' element = {<UserProfile/>} />
      <Route path = '/myorders' element = {<MyOrders/>} />
      <Route path = '/myorders/:id' element = {<OrderDetails/>} />
      <Route path='/forgotpassword' element = {<ForgotPassword/>} />
      <Route path='/verifyotp' element = {<VerifyOtp/>} />
      <Route path = '/resetpassword' element = {<ResetPassword/>} />
    </Routes>

    <Footer />
    <ToastContainer />
    </BrowserRouter>  
    </Provider>

    </>
  )
}

export default App