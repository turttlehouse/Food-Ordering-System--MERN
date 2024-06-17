import {createSlice} from "@reduxjs/toolkit";
import {STATUSES} from "../globals/misc/statuses";
import { APIAuthenticated } from "../http";


const orderSlice = createSlice({
    name : "order",
    initialState : {
        status : STATUSES.SUCCESS,
        orders: null
    },
    reducers : {

        setStatus(state,action)
        {
            state.status = action.payload
        },
        setOrders(state,action)
        {
            state.orders = action.payload
        },
        deleteOrderById(state,action)
        {
            const index = state.orders?.findIndex((order)=>order._id === action.payload.orderId)
            state.orders.splice(index,1);  

        },

        updateOrderById(state,action)
        {
           
            const index = state.orders?.findIndex(order=>order?._id === action.payload.orderId)
            if(index !== -1)
            {
                state.orders[index] = action.payload.data
            }    
        },
        updatePaymentStatusById(state,action)
        {
            const index = state.orders?.findIndex(order=>order?._id === action.payload.orderId)

            if(index !== -1)
            {
                state.orders[index] = action.payload.data
            }    
        }

    }
})

export const {setStatus,setOrders,deleteOrderById,updateOrderById,updatePaymentStatusById} = orderSlice.actions

export default orderSlice.reducer

export function fetchOrder()
{
    return async function fetchOrderThunk(dispatch)
    {
        dispatch(setStatus(STATUSES.LOADING));
        try {

            const response = await APIAuthenticated.get("/admin/orders")
            dispatch(setOrders(response.data.data.reverse()));
            dispatch(setStatus(STATUSES.SUCCESS))
            
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }
    }
}

export function deleteOrders(orderId){
    return async function deleteOrdersThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));

        try {
            const response = await APIAuthenticated.delete(`admin/orders/${orderId}`);
            dispatch(deleteOrderById({orderId}))
            dispatch(setStatus(STATUSES.SUCCESS));
            
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
            
        }

    }
}


export function updateOrderStatus(orderId,orderStatus){
    return async function updateOrderStatusThunk(dispatch)
    {
        dispatch(setStatus(STATUSES.LOADING));
        try {

            const response = await APIAuthenticated.patch(`admin/orders/${orderId}`,{orderStatus})

            dispatch(updateOrderById({orderId,data : response.data.data}))
            
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
            
        }
    }
}


export function updatePaymentStatus(orderId,paymentStatus)
{
    return async function updatePaymentStatusThunk(dispatch)
    {
        dispatch(setStatus(STATUSES.LOADING))
        try {

            const response = await APIAuthenticated.patch(`admin/orders/paymentstatus/${orderId}`,{paymentStatus});
            dispatch(updatePaymentStatusById({orderId,data :response.data.data}))
            dispatch(setStatus(STATUSES.SUCCESS))
            
        } catch (error) {

            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
            
        }
    }
}

