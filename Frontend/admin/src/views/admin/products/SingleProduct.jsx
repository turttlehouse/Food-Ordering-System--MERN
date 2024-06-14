import { APIAuthenticated } from 'http';
import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { updateTsqPP } from 'store/productSlice';
import { updateProductStatus } from 'store/productSlice';


const SingleProduct = () => {

    const {id} = useParams();

    const {products} = useSelector((state)=>state.products);

    const [filteredproduct] =  products?.filter((product)=>product._id === id);
    
    const navigate = useNavigate();

    const deleteproduct = async()=>{

        try {
            const response = await APIAuthenticated.delete("/admin/products/"+id);

            if(response.status === 200)
            {
                navigate("/admin/products");
            }    
            
        } catch (error) {

            console.log(error);
            
        }
    }

    const [productStatus,setproductStatus] = useState(filteredproduct?.productStatus)
    
    const dispatch = useDispatch();

    const handleproductStatus = (e)=>{

        setproductStatus(e.target.value);

        dispatch(updateProductStatus(id,e.target.value))
    }


    const handleChange = (value,name)=>{

        let data = {};

        data[name === 'pp' ? 'productPrice' : 'productStockQty'] = value;

        dispatch(updateTsqPP(id,data))
    }

    const [orders,setOrders] = useState([]);

    const fetchProductOrders = async()=>{
        const response = await APIAuthenticated.get(`/products/productOrders/${id}`)

        if(response.status === 200)
        {
            setOrders(response.data.data);
        }
    }


    useEffect(()=>{

        fetchProductOrders();

    },[])


   

    return (

        <>

            <div class="py-[100px] dark:bg-gray-200 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">


                {/* Heading */}
                <div class="flex justify-start item-start space-y-2 flex-col">
                    <h1 class="text-xl dark:text-black lg:text-xl font-semibold leading-7 lg:leading-9 text-gray-600">product Id&nbsp;{id}</h1>
                    <p class="text-base dark:text-gray-800 font-medium leading-6 text-gray-600">{new Date(filteredproduct?.createdAt).toLocaleDateString()}</p>
                </div>

                <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                
                    {/*customer cart, summary & shipping */}

                    <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        
                        {/* Product details */}
                        <div class="flex flex-col justify-start items-start text-black  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            
                            <p class="text-lg md:text-xl text-black  font-semibold leading-6 xl:leading-5">My product</p>

                                        {/* data haru object ko form ma xa so map garnu parena */}
                                        <div  class="mt-4 p-2 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                
                                            <div class="pb-4 md:pb-8 w-full md:w-40">
                                                <img class="w-full hidden md:block" src={filteredproduct?.productImage} alt="dress" />
                                                <img class="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
                                            </div>
                
                                            <div class="bproduct-b bproduct-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                            
                                                <div class="w-full flex flex-col justify-start items-start space-y-8">
                                                
                                                    <h3 class="text-xl text-black xl:text-2xl font-semibold leading-6 text-gray-800">{filteredproduct?.productName}</h3>
                
                                                </div>
                
                                                <div class="flex justify-between space-x-8 items-start w-full">
                                                    <p class="text-base text-black xl:text-lg leading-6">Rs.{filteredproduct?.productPrice}</p>
                                                    <p class="text-base text-black xl:text-lg leading-6 text-gray-800">Quantity:{filteredproduct?.productStockQty}</p>
                                                    <p class="text-base text-black xl:text-lg font-semibold leading-6 text-gray-800">Status : {filteredproduct?.productStatus}</p>
                                                </div>
                
                                            </div>
            
                                        </div>



                             
                            
                        

                        </div>

                        {/*All Orders of that product  */}
                        <div class="flex flex-col justify-start items-start text-black  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            
                            <p class="text-lg md:text-xl text-black  font-semibold leading-6 xl:leading-5">Orders</p>

                                        {/* data haru array ko form ma xa so map garnu parne hunxa dekhauna*/}

                                        {
                                            orders.length > 0 && orders.map((order)=>{
                                                return(

                                                    <div key={order?._id}  class="mt-4 p-2 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    
                                                        <div class="bproduct-b bproduct-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-1 space-y-4 md:space-y-0">
                                                        
                                                            <div class="w-full flex flex-col justify-start items-start space-y-8">
                                                                {/* <h1>order id</h1> */}
                                                                <h1 class="text-sm font-extrabold leading-none tracking-tight text-gray-900 md:text-sm lg:text-sm dark:text-white"><mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">Order Id</mark></h1>
                                                                <h3 class="text-xl text-black xl:text-sm font-semibold leading-6 text-gray-800">{order._id}</h3>
                            
                                                            </div>
                            
                                                            <div class="flex justify-between space-x-8 items-start w-full">
                                                                <div className='flex flex-col gap-1'>
                                                                     <h1>Order Status</h1>
                                                                    <p class="text-base text-black xl:text-lg leading-6">{order?.orderStatus}</p>

                                                                </div>

                                                                <div className="flex flex-col gap-1">
                                                                    <h1>Shipping Address</h1>

                                                                    <p class="text-base text-black xl:text-lg leading-6 text-gray-800">{order?.shippingAddress}</p>
                                                                </div>

                                                                <div className="flex flex-col gap-1">
                                                                    <h1>Phone Number</h1>
                                                                    <p class="text-base text-black xl:text-lg font-semibold leading-6 text-gray-800">{order?.phoneNumber}</p>
                                                                </div>
                                                            </div>
                            
                                                        </div>
                
                                                    </div>

                                                )
                                            })
                                        }
                                        



                             
                            
                        

                        </div>


                    </div>

                        {/* Shipping Address  */}
                        <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                            
                            <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full  w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                                
                            
                                <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                    
                                    <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                        
                                        <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                            
                                                <label htmlFor="countries" class="block mb-2 p-2 rounded bg-blue-700 text-white text-sm font-medium  dark:text-white">Select product Status</label>
                                               
                                                <select onChange={handleproductStatus}   id="countries" className="bg-gray-50  border-4  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:bproduct-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:bproduct-blue-500">
                                                    <option value="available">Available</option>
                                                    <option value="unavailable">Unavailable</option>
                                                    
                                                </select>
                                                <div className="flex flex-col">

                                                <label htmlFor="countries" class="block text-center mb-2 p-2 rounded bg-blue-700 text-white text-sm font-medium  dark:text-white">Update Stock Quantity</label>
                                                <input onChange={(e)=>handleChange(e.target.value,'tsq')} min={0} max={1000}  value={filteredproduct?.productStockQty} className='border-2 border-black mb-2' type="number" name="tsq" id="tsq" />
                                                
                                                <label htmlFor="countries" class="block text-center mb-2 p-2 rounded bg-blue-700 text-white text-sm font-medium  dark:text-white">Update Price</label>
                                                <input onChange={(e)=>handleChange(e.target.value,'pp')} min={0}  value={filteredproduct?.productPrice} className='border-2 border-black' type="number" name="pp" id="pp" />
                                                </div>
                                              


                                            {
                                            filteredproduct?.productStatus !=="cancelled" &&(
                                                <>
                                                
                                                    {/* <button class="mt-6 md:mt-0 dark:bproduct-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bproduct bproduct-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Update product</button> */}
                                                    <button onClick={deleteproduct} class="mt-6 md:mt-0 dark:bproduct-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bproduct bproduct-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Delete product</button>
                                                    {/* <button onClick={cancelproduct} class="mt-6 md:mt-0 dark:bproduct-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bproduct bproduct-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Cancel product</button> */}
                                                
                                                </>
                                            )
                                        }
                                        </div>
                                     
                                    </div>


                                    {/* <div class="flex mt-2 w-full justify-center items-center md:justify-start md:items-start"> */}

                                        {/* {
                                            filteredproduct?.productStatus !=="cancelled" &&(
                                                <>
                                                
                                                    <button class="mt-6 md:mt-0 dark:bproduct-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bproduct bproduct-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Update product</button>
                                                    <button onClick={deleteproduct} class="mt-6 md:mt-0 dark:bproduct-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bproduct bproduct-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Delete product</button>
                                                    <button onClick={cancelproduct} class="mt-6 md:mt-0 dark:bproduct-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bproduct bproduct-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Cancel product</button>
                                                
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

export default SingleProduct