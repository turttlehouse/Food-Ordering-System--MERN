import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifyotp } from "../../../store/authSlice"
import { useNavigate } from "react-router-dom"
import { STATUSES } from "../../../globals/misc/statuses"


const VerifyOtp = () => {

    const [otp,setOtp] = useState(null)

    const {forgotPasswordData} = useSelector((state)=>state.auth)

    const dispatch = useDispatch()

    const data2 = {
        email : forgotPasswordData.email,
        otp : otp
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(verifyotp(data2))
    }

    const navigate = useNavigate();

    useEffect(()=>{
        if(forgotPasswordData.status === STATUSES.SUCCESS)
        {
            navigate("/resetpassword")
        }
    },[forgotPasswordData.status])








    

    return (
      <>
      <div className="flex items-center justify-center h-screen overflow-hidden bg-yellow-50">

          <div className="mt-20 bg-white w-17/12 lg:w-5/12 md:6/12 shadow-3xl ">

          
            {/* Logo */}
            <div className="absolute p-4  transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-full left-1/2 md:p-8">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
              </svg>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}   className="p-3 md:p-10">

              <div className="flex items-center mb-6 text-lg md:mb-8">

                <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                  <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
                </svg>

                <input onChange={(e)=>setOtp(e.target.value)}  name="otp" type="otp" id="otp" className="w-full py-2 pl-12 bg-gray-200 md:py-4 focus:outline-none" placeholder="OTP" />
              
              </div>

            

              <button className="w-full p-2 font-medium text-white uppercase bg-gradient-to-b from-gray-700 to-gray-900 md:p-4">Verify OTP</button>

  
            
            </form>

          </div>

      </div>
      </>
    )
  }
  
    export default VerifyOtp