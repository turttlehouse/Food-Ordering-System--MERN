import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartItem } from '../../store/cartSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const{items:products} = useSelector((state)=>state.cart)

    const totalItemsInCart = products.reduce((total,item)=>
           
        item.quantity + total,0)

    const totalAmountOfCart = products.reduce((amount,item)=>{

       return item.quantity * item.product?.productPrice + amount

    },0)

    const dispatch = useDispatch();

    const handleQuantityChange = (productId,newQuantity)=>{

        dispatch(updateCartItem(productId,newQuantity));

    }

    const handleDelete = (productId)=>{

        dispatch(deleteCartItem(productId));

    }


    const navigate = useNavigate();



  return (
   
   <>

        <div className="h-screen bg-gray-100 pt-20">

                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">

                        {/* Left Div Products List */}
                        <div className="rounded-lg md:w-2/3">

                            {/* products */}

                            {
                               
                                products.map((product)=>{

                                    return(

                                        <div key={product.product?._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                        
                                            <img src={product.product?.productImage} alt="product-image" className="w-full rounded-lg sm:w-40" />
        
                                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">

                                                <div className="mt-5 sm:mt-0">
                                                    <h2 className="text-lg font-bold text-gray-900">{product.product?.productName}</h2>
                                                    <p className="mt-1 text-xs text-gray-700">{product.product?.productPrice}</p>
                                                </div>

                                                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">

                                                    {/* Add and Subtract Product Quantity */}
                                                    <div className="flex items-center border-gray-100">
                                                        {/* - */}
                                                        <span onClick={()=>handleQuantityChange(product.product?._id,product.quantity-1)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>

                                                        <input onChange={(e)=>handleQuantityChange(product.product?._id,e.target.value)} className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={product.quantity}  min="1" />

                                                        {/* + */}
                                                        <span onClick={()=>handleQuantityChange(product.product?._id,product.quantity+1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>

                                                    </div>

                                                    <div onClick={()=>handleDelete(product.product._id)} className="flex items-center space-x-4">
                                                        {/* <svg onClick={()=>removeItem(product._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-Width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"> */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>

                                                </div>

                                            </div>
        
                                        </div>

                                    )


                                })

                            }
                           
                        
                        </div>


                        {/* <!--Right Div Sub total --> */}
                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                           
                            <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Total items</p>
                            <p className="text-gray-700">{totalItemsInCart}</p>
                            </div>
                            

                            {/* Shipping Div */}
                            {/* <div className="flex justify-between">
                                <p className="text-gray-700">Shipping</p>
                                <p className="text-gray-700">$4.99</p>
                            </div> */}
                            
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">Total Price</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">Rs.{totalAmountOfCart}</p>
                            </div>
                            </div>
                            
                            {/* CheckOut Button */}
                            <button onClick={()=>navigate("/checkout")} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                        
                        </div>

                </div>
                
        </div>
    
    </>
  )
}

export default Cart