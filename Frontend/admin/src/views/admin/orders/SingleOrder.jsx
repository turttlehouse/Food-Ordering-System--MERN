import { socket } from 'App';
import { APIAuthenticated } from 'http';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { updatePaymentStatus } from 'store/orderSlice';
import { updateOrderStatus } from 'store/orderSlice';


const SingleOrder = () => {

    const {id} = useParams();

    const {orders} = useSelector((state)=>state.orders);

    
    const [newOrder,setNewOrder] = useState([])

    const fetchOrders =async()=>{
        const response = await APIAuthenticated.get("admin/orders")
        // console.log(response.data.data);

        if(response.status === 200)
        {
            setNewOrder(response.data.data)
        }
    }

    useEffect(()=>{
        fetchOrders()
    },[])

    const [filteredOrder] =  orders? orders.filter((order)=>order?._id === id) : newOrder.filter((order)=>order._id === id);
    
    const navigate = useNavigate();


    const deleteOrder = async()=>{

        try {
            const response = await APIAuthenticated.delete("/admin/orders/"+id);

            if(response.status === 200)
            {
                navigate("/admin/orders");
            }    
            
        } catch (error) {

            console.log(error);
            
        }
    }

    const [orderStatus,setOrderStatus] = useState(filteredOrder?.orderStatus)
    
    const dispatch = useDispatch();

    const handleOrderStatus = (e)=>{

        setOrderStatus(e.target.value);
        
        //ws
        socket.emit("updateOrderStatus",{
            status : e.target.value,
            orderId : id,
            userId : filteredOrder.user._id
        })
        
        dispatch(updateOrderStatus(id,e.target.value))
    }
   


    const [paymentStatus,setPaymentStatus] = useState(filteredOrder?.paymentDetails.status)

    const handlePaymentStatus = (e)=>{

        setPaymentStatus(e.target.value)
        dispatch(updatePaymentStatus(id,e.target.value));
    }


    return (

        <>

            <div class="py-[100px] dark:bg-gray-200 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">


                {/* Heading */}
                <div class="flex justify-start item-start space-y-2 flex-col">
                    <h1 class="text-xl dark:text-black lg:text-xl font-semibold leading-7 lg:leading-9 text-gray-600">Order Id&nbsp;{id}</h1>
                    <p class="text-base dark:text-gray-800 font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p>
                </div>

                <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                
                    {/*customer cart, summary & shipping */}

                    <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        
                        {/* Customer Cart */}
                        <div class="flex flex-col justify-start items-start text-black  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            
                            <p class="text-lg md:text-xl text-black  font-semibold leading-6 xl:leading-5">My Order</p>

                            {
                                filteredOrder && filteredOrder.items.length > 0 && filteredOrder.items.map((item)=>{
                                
                                    return(

                                        <div key={item._id} class="mt-4 p-2 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                
                                            <div class="pb-4 md:pb-8 w-full md:w-40">
                                                <img class="w-full hidden md:block" src={item?.product?.productImage} alt="dress" />
                                                <img class="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
                                            </div>
                
                                            <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                            
                                                <div class="w-full flex flex-col justify-start items-start space-y-8">
                                                
                                                    <h3 class="text-xl text-black xl:text-2xl font-semibold leading-6 text-gray-800">{item?.product?.productName}</h3>
                
                                                </div>
                
                                                <div class="flex justify-between space-x-8 items-start w-full">
                                                    <p class="text-base text-black xl:text-lg leading-6">Rs.{item?.product?.productPrice}</p>
                                                    <p class="text-base text-black xl:text-lg leading-6 text-gray-800">Qty:{item?.quantity}</p>
                                                    <p class="text-base text-black xl:text-lg font-semibold leading-6 text-gray-800">Rs.{item?.product?.productPrice * item?.quantity}</p>
                                                </div>
                
                                            </div>
            
                                        </div>



                                    )
                                })
                            }
                            
                        

                        </div>


                        {/* summary & shipping */}
                        <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            
                            {/* summary */}
                            <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                              
                                <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                                
                                <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    
                                    <div class="flex justify-between w-full">
                                        <p class="text-base dark:text-white leading-4 text-gray-800">Payment Method</p>
                                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredOrder?.paymentDetails.method}</p>
                                    </div>

                                    <div class="flex justify-between items-center w-full">
                                        <p class="text-base dark:text-white leading-4 text-gray-800">Payment Status</p>
                                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredOrder?.paymentDetails.status}</p>
                                    </div>

                                    <div class="flex justify-between items-center w-full">
                                        <p class="text-base dark:text-white leading-4 text-gray-800">Order Status</p>
                                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredOrder?.orderStatus}</p>
                                    </div>

                                </div>

                                <div class="flex justify-between items-center w-full">
                                    <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                    <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{filteredOrder?.totalAmount}</p>
                                </div>

                            </div>


                            {/* shipping */}
                            <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                            
                                <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
                                
                                <div class="flex justify-between items-start w-full">
                                
                                    <div class="flex justify-center items-center space-x-4">
                                    
                                        <div class="w-8 h-8">
                                            <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                        </div>

                                        <div class="flex flex-col justify-start items-center">
                                            <p class="text-lg leading-6 dark:text-white font-semibold text-gray-800">Delivery Charge<br /><span class="font-normal">Delivery within 24 Hours</span></p>
                                        </div>

                                    </div>

                                    <p class="text-lg font-semibold leading-6 dark:text-white text-gray-800">Rs.10</p>
                                
                                </div>

                                

                            </div>

                        </div>


                    </div>

                        {/* Shipping Address  */}
                        <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                            
                            <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full  w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                                
                            
                                <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                    
                                    <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                        
                                        <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer Details</h3>
                                            <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">User:{filteredOrder?.user?.userName}</p>
                                            <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address :{filteredOrder?.shippingAddress}</p>
                                            <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Phone Number : {filteredOrder?.phoneNumber}</p>
                                            
                                               
                                                <label htmlFor="countries" class="block mb-2 p-2 rounded bg-blue-700 text-white text-sm font-medium  dark:text-white">Update Order Status</label>
                                               
                                                <select onChange={handleOrderStatus} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    {/* <option value={filteredOrder?.orderStatus}>{filteredOrder?.orderStatus}</option> */}
                                                    <option value="pending">Pending</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="ontheway">On the Way</option>
                                                    <option value="preparation">Preparation</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>

                                                <label htmlFor="countries" class="block mb-2 p-2 rounded bg-blue-700 text-white text-sm font-medium  dark:text-white">Update Payment Status</label>
                                               
                                                <select onChange={handlePaymentStatus} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    
                                                    <option value="pending">Pending</option>
                                                    <option value="paid">Paid</option>
                                                    <option value="unpaid">Unpaid</option>
                                    
                                                </select>


                                            {
                                            filteredOrder?.orderStatus !=="cancelled" &&(
                                                <>
                                                
                                                    {/* <button class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Update Order</button> */}
                                                    <button onClick={deleteOrder} class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Delete Order</button>
                                                    {/* <button onClick={cancelOrder} class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Cancel Order</button> */}
                                                
                                                </>
                                            )
                                        }
                                        </div>
                                        
                                    

                                    </div>


                                    {/* <div class="flex mt-2 w-full justify-center items-center md:justify-start md:items-start"> */}

                                        {/* {
                                            filteredOrder?.orderStatus !=="cancelled" &&(
                                                <>
                                                
                                                    <button class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Update Order</button>
                                                    <button onClick={deleteOrder} class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Delete Order</button>
                                                    <button onClick={cancelOrder} class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Cancel Order</button>
                                                
                                                </>
                                            )
                                        } */}
                                    {/* </div> */}

                                </div>

                            </div>

                        </div>


                </div>

            </div>
        
        </>

  )
}

export default SingleOrder