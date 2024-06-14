import React from 'react'
import { useEffect,useState } from 'react'
import { APIAuthenticated } from '../../http'
import { useNavigate } from 'react-router-dom'
import Loader from '../../globals/components/loader/Loader'
import { useDispatch } from 'react-redux'
import { emptyCart } from '../../store/cartSlice'


const KhaltiSuccess = () => {

    const queryparams = new URLSearchParams(location.search)
    const pidx = queryparams.get("pidx")
    const [loading,setLoading] = useState(true)

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const verifyPidx = async()=>{
      try {
        const response = await APIAuthenticated.post("/payment/verifypidx",{pidx})
        if(response.status === 200)
        {
          setLoading(false);
          dispatch(emptyCart());
          window.location.href = "/"
          
        }
        
      
      } catch (error) {
        console.log(error);
        
      }
    }
   
    useEffect(()=>{

      verifyPidx();


    },[])

    if(loading)
    {
      return(
        
        <Loader status='Verifying'/>

      )
      
    }

    else{
      
      return (
        
        <Loader status='Verified'/>

      )
    }
}

export default KhaltiSuccess