import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from 'store/authSlice';

const ProtectedRoute = ({children}) => {

    const {data} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();

    useEffect(()=>{

        dispatch(fetchProfile())
    },[dispatch])


    if(data.role === 'admin')
    {
        return (

            <>
        
             <div>{children}</div>
            
            </>
          )

    }  
    else{
        return(

            <>You don't have permission</>

        )
    }  

 
}

export default ProtectedRoute