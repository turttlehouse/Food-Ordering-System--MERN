import { STATUSES } from 'globals/misc/statuses'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProduct } from 'store/productSlice'


const AddProduct = () => { 


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {status} = useSelector((state)=>state.products);
  console.log(status);
  
  const {register,handleSubmit,formState} = useForm()
  
  

    const handleProduct = async(data)=>{

      data = {...data,productImage : data.productImage[0]}
      
      await dispatch(addProduct(data))
    

      if(status == STATUSES.SUCCESS)
      {
        navigate("/admin/products")
      }


    }



 


  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">

      <div className="bg-white w-17/12 lg:w-10/12 md:6/12 shadow-3xl ">


        {/* Form submit huda ko event jasle mathi handleSubmit function lai trigger garxa */}
        <form onSubmit={handleSubmit((data)=>{

          handleProduct(data)

        })} noValidate className="p-3 md:p-5">

         
          <div className="flex items-center mb-6 text-lg md:mb-5">

            {/* Icon */}
            <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
            </svg>

            <input {...register("productName",{required:"productName is required"})}  type="text" name="productName" id="productName" className="w-full  pl-12 bg-gray-200 md:py-2 focus:outline-none" placeholder="productName" />
            <p>{formState.errors.productName && formState.errors.productName.message}</p>
          </div>

          <div className="flex items-center mb-6 text-lg md:mb-5">

            {/* <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
            </svg> */}
            
            {/* rows={3} we can give rows to description  */}
            <textarea {...register("productDescription",{required:"productDescription is required"})} type="productDescription" name="productDescription" id="productDescription" className="w-full  pl-12 bg-gray-200 md:py-2 focus:outline-none" placeholder="Description" />
            <p>{formState.errors.productDescription && formState.errors.productDescription.message}</p>

          </div>


          <div className="flex gap-1">


            <div className="flex items-center mb-6 text-lg md:mb-5">
                
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
                </svg>
                
                <input {...register("productPrice",{required:"productPrice is required"})} type="number" name="productPrice" id="productPrice" className="w-full  pl-12 bg-gray-200 md:py-2 focus:outline-none" placeholder="productPrice" />
                <p>{formState.errors.productPrice && formState.errors.productPrice.message}</p>

            </div>

            <div className="flex items-center mb-6 text-lg md:mb-5">
                
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
                </svg>
                
                <input {...register("productStockQty",{required:"productStockQty is required"})}  type="number" name="productStockQty" id="productStockQty" className="w-full  pl-12 bg-gray-200 md:py-2 focus:outline-none" placeholder="productQty" />
                <p>{formState.errors.productStockQty && formState.errors.productStockQty.message}</p>

            </div>

            <div className="items-center mb-6 text-lg md:mb-5">
                              
                <input {...register("productImage",{required:"productImage is required"})} type="file" name="productImage" id="productImage" className="w-full  pl-2  bg-gray-200 md:py-1.5 focus:outline-none" placeholder="productImage" />
                <p>{formState.errors.productImage && formState.errors.productImage.message}</p>

            </div>
          
          </div>

          <div>
            
            <label htmlFor="countries" class="block mb-2 p-2 rounded text-black text-sm font-medium  dark:text-white">Select product Status</label>
            <select {...register("productStatus",{required : "productStatus is required"})}  id="countries" className="bg-gray-50  border-4  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:bproduct-blue-500 block w-full p-1 mb-8  dark:placeholder-gray-400 dark:text-white dark:focus:bproduct-blue-500">
                
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
                
            </select>
            <p>{formState.errors.productStatus && formState.errors.productStatus.message}</p>

          </div>


          <button className="w-full p-2 font-medium text-white uppercase bg-gradient-to-b from-gray-700 to-gray-900 md:p-4">Add Product</button>
        
        </form>
      </div>
     </div>
  )
}

export default AddProduct