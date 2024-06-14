import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {API} from "../http";

const STATUSES =Object.freeze({

    SUCCESS : "success",
    ERROR : "error",
    LOADING : "loading"

})

const productSlice = createSlice({

    name : "product",
    initialState : {
        data :[],
        status : STATUSES.SUCCESS,
        selectedProduct : {}
    },
    
    reducers : {
        setProducts(state,action)
        {
            state.data = action.payload
        },

        setStatus(state,action)
        {
            state.status = action.payload
        },
        setselectedProduct(state,action)
        {
            state.selectedProduct = action.payload 
        }


    },
    //for approach 2
    extraReducers : (builder) =>{
        builder
        .addCase(fetchProducts.pending,(state,action)=>{
            state.status = STATUSES.LOADING
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.data = action.payload
            state.status = STATUSES.SUCCESS
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.status = STATUSES.ERROR
        })
    }

})


export const {setProducts,setStatus,setselectedProduct} = productSlice.actions


export default productSlice.reducer

//Approach 2 : redux toolkit ko middleware use garne jasle automatic status set gardinxa

export const fetchProducts = createAsyncThunk('products/fetch',async()=>{

        const response = await API.get('/products');
        // console.log(response);
        const data = response.data.data;
        // console.log(data);   
        return data

    
})

//Approach 1 - problem vanum ya flexibility status manually set garnu parne vayo
// export function fetchProducts(){

//     //getState le mathiko initialState ko data tannu paro vaney
//     return async function fetchProductThunk(dispatch)
//     {
//         dispatch(setStatus(STATUSES.LOADING))
//         try{
//              const response = await axios.get('http://localhost:5000/api/products');
//             //  console.log(response);
//              //product ko data response.data.data ma airako hunxa tyo  kura lai chai dispatch garnu paro
//              //so dispatch banauna lai action chainxa so reducer vitra setProduct vanne action banaune
//              //dispatch(action(payload))
//              dispatch(setProducts(response.data.data));
//              dispatch(setStatus(STATUSES.SUCCESS));


//         }
//         catch(error)
//         {
//             console.log(error);
//             //error auda ni status pathaune ho frontend ma teskai basis kun page dekhaune
//             //error page dekhaune vanera decide hunxa
//             dispatch(setStatus(STATUSES.ERROR))

//         }
//     }



// }




export function fetchProductDetails(productId)
{
    return async function fetchProductDetailsThunk(dispatch)
    {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get(`/products/${productId}`);
            // console.log(response);

            dispatch(setselectedProduct(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));


            
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
            
        }
    }
}