import {createSlice} from "@reduxjs/toolkit";
import {STATUSES} from "../globals/misc/statuses";
import { APIAuthenticated } from "../http";


const productSlice = createSlice({
    name : "product",
    initialState : {
        status : STATUSES.LOADING,
        products: null
    },
    reducers : {

        setStatus(state,action)
        {
            state.status = action.payload
        },
        setproducts(state,action)
        {
            state.products = action.payload
        },
        deleteProductById(state,action)
        {
            const index = state.products.findIndex(product=>product._id === action.payload.productId)
            state.products.splice(index,1)  

        },
        updateProductStatusById(state,action)
        {
            const index = state.products.findIndex(product=>product._id === action.payload.productId)
            if(index !== -1)
            {
                state.products[index] = action.payload.data
            }
        },
        addNewProduct(state,action)
        {
            state.products.push(action.payload);
        },

    }
})

export const {setStatus,setproducts,deleteProductById,updateProductStatusById,addNewProduct} = productSlice.actions

export default productSlice.reducer

export function fetchproduct()
{
    return async function fetchproductThunk(dispatch)
    {
        dispatch(setStatus(STATUSES.LOADING));
        try {

            const response = await APIAuthenticated.get("/products")
            dispatch(setproducts(response.data.data.reverse()));
            dispatch(setStatus(STATUSES.SUCCESS))
            
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }
    }
}

export function deleteProduct(productId)
{
    return async function deleteProductThunk(dispatch)
    {
        dispatch(setStatus(STATUSES.LOADING))
        try {

            const response = await APIAuthenticated.delete(`/products/${productId}`)
            dispatch(setproducts({productId}))
            dispatch(setStatus(STATUSES.SUCCESS))
            
        } catch (error) {

            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
            
        }
    }
}

export function updateProductStatus(productId,productStatus)
{
    return async function updateProductStatusThunk(dispatch)
    {
        dispatch(setStatus(STATUSES.LOADING))
        try {

            const response = await APIAuthenticated.patch(`/products/status/${productId}`,{productStatus})
            dispatch(updateProductStatusById({productId,data: response.data.data}))
            dispatch(setStatus(STATUSES.SUCCESS))
            
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
            
        }
    }
}

export function updateTsqPP(productId,data)
{
    return async function updateTsqPPThunk(dispatch)
    {
        dispatch(setStatus(STATUSES.LOADING))
        try {

            const response = await APIAuthenticated.patch(`/products/stockprice/${productId}`,data)
            
            dispatch(updateProductStatusById({productId,data : response.data.data}))
            dispatch(setStatus(STATUSES.SUCCESS))
            
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
            
        }
    }
}


export function addProduct(data)
{
    return async function addProductThunk(dispatch)
    {
        dispatch(setStatus(STATUSES.LOADING));
        try {

            const response = await APIAuthenticated.post("/products",data,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            });
            dispatch(addNewProduct(response.data.data.reverse()))
            dispatch(setStatus(STATUSES.SUCCESS))
            
        } catch (error) {

            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
            
        }
    }
}