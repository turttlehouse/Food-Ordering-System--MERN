import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from 'store/productSlice';
import { fetchproduct } from 'store/productSlice';

const Myproducts = () => {

    const dispatch = useDispatch();

    const {products} = useSelector((state)=>state.products)
    console.log(products);


    useEffect(()=>{
        
       
        dispatch(fetchproduct())

    },[dispatch])


      const [searchTerm,setSearchTerm] = useState('')

    const [date,setDate] = useState('');

    const [selectedItem,setSelectedItem] = useState('all')

    const filteredproducts = products?.filter((product)=>

      selectedItem === 'all' || product.productStatus === selectedItem)

      .filter((product)=>
    

        product._id?.toLowerCase().includes(searchTerm.toLowerCase())   ||

        product?.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||

        product.productPrice.toString().includes(searchTerm.toString())
        

    )

    .filter((product)=>

        date === "" || new Date(product.createdAt).toLocaleDateString() === new Date(date).toLocaleDateString()
    )

    const navigate = useNavigate();


    const deleteProductId = (productId)=>{

        dispatch(deleteProduct(productId));
        window.location.href ='/admin/products'
        

    }




  return (

    <>

        <div className="antialiased font-sans bg-gray-200 pt-20">
          
            <div className="container mx-auto px-4 sm:px-8">
                
                <div className="py-8">
                  
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight">products</h2>
                    </div>

                    <div className="my-2 flex sm:flex-row flex-col">

                        {/* status */}
                        <div className="flex flex-row mb-1 sm:mb-0">
                            
                            <div className="relative">

                                {/* tracking the targeted value  */}
                                <select 
                                    onChange={(e)=>setSelectedItem(e.target.value)}
                                    className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                    <option value='all'>All</option>
                                    <option value='available'>Available</option>
                                    <option value='unavailable'>Unavailable</option>
                                   
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>

                        </div>

                        {/* Search */}
                        <div className="block relative ml-1">
                          
                            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                    <path
                                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                    </path>
                                </svg>
                            </span>

                            <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search" className="appearance-none rounded-r rounded-l sm:rounded-l-none bproduct bproduct-gray-400 bproduct-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                        
                        </div>

                        {/* Date */}
                        <div className="block relative ml-1">
                     
                          <input type='date' value={date} onChange={(e)=>setDate(e.target.value)} className="appearance-none rounded-r rounded-l sm:rounded-l-none bproduct bproduct-gray-400 bproduct-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                      
                        </div>

                    </div>

                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            
                            <table className="min-w-full leading-normal">
                               
                                <thead>
                                   
                                    <tr>
                                        
                                        <th className="px-5 py-3 bproduct-b-2 bproduct-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Id
                                        </th>

                                        <th className="px-5 py-3 bproduct-b-2 bproduct-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Name
                                        </th>

                                        <th className="px-5 py-3 bproduct-b-2 bproduct-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            StockQty
                                        </th>

                                        <th className="px-5 py-3 bproduct-b-2 bproduct-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Price
                                        </th>

                                        <th className="px-5 py-3 bproduct-b-2 bproduct-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Created At
                                        </th>

                                        <th className="px-5 py-3 bproduct-b-2 bproduct-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Action
                                        </th>

                                       

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                    
                                       filteredproducts && filteredproducts.length > 0 &&   filteredproducts.map((product)=>{

                                        return(

                                            <tr key={product._id}>

                                                <td className="px-5 py-5 bproduct-b bproduct-gray-200 bg-white text-sm">

                                                    <p onClick={()=>navigate(`/admin/products/${product._id}`)} className="text-blue-900 underline whitespace-no-wrap">{product._id}</p>

                                                </td>

                                                <td className="px-5 py-5 bproduct-b bproduct-gray-200 bg-white text-sm">
                                                    
                                                    <p className="text-gray-900 whitespace-no-wrap">{product.productName}</p>
                                                    
                                                </td>

                                                <td className="px-5 py-5 bproduct-b bproduct-gray-200 bg-white text-sm">
                                                    
                                                    <p className="text-gray-900 whitespace-no-wrap">{product.productStockQty}</p>
                                                    
                                                </td>
                                                
                                                <td className="px-5 py-5 bproduct-b bproduct-gray-200 bg-white text-sm">
                                                  
                                                  <p className="text-gray-900 whitespace-no-wrap">{product.productPrice}</p>

                                                </td>

                                                <td className="px-5 py-5 bproduct-b bproduct-gray-200 bg-white text-sm">
                                                    
                                                    <p className="text-gray-900 whitespace-no-wrap">{new Date(product.createdAt).toLocaleDateString()}</p>
                                                    
                                                </td>

                                                <td className="px-5 py-5 bproduct-b bproduct-gray-200 bg-white text-sm">
                                                  
                                                     <button onClick={()=>deleteProductId(product._id)} type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>

                                                </td>

                                            </tr>


                                        )

                                        
                                        })
                                    }
                                    
                                   

                                    

                                </tbody>

                            </table>
                          
                            {/* Pagination */}
                            <div
                                className="px-5 py-5 bg-white bproduct-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                <span className="text-xs xs:text-sm text-gray-900">
                                    Showing 1 to 4 of 50 Entries
                                </span>
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <button
                                        className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                        Prev
                                    </button>
                                    <button
                                        className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                        Next
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    
    
    
    </>

  )
}

export default Myproducts