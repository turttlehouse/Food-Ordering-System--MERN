import React from 'react'
import Review from './component/Review/Review'
import SingleProduct from './component/SingleProduct/SingleProduct'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {

  const {id} = useParams();

  return (

    <>  
        <SingleProduct id={id} />
        <Review />    
    
    </>
  )
}

export default ProductDetails