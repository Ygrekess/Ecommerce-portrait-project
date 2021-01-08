import Axios from "axios";
import Cookie from 'js-cookie';
import { getInfos } from "./userActions";

const createOrder = (order) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: "ORDER_CREATE_REQUEST", payload : {order: order, userInfo: userInfo} })
    try {        
        const { data: { data: newOrder } } = await Axios.post("http://localhost:5000/api/orders", { order: order, userInfo: userInfo });
        dispatch({ type: "ORDER_CREATE_SUCCESS", payload: newOrder });
    } catch (error) {
        dispatch({ type: "ORDER_CREATE_FAIL", payload: error.message });
    }
}

const resetOrder = () => (dispatch) => {
    dispatch({ type: "ORDER_RESET" });
} 

/* const recupUserOrders = (userId) => async (dispatch, getState) => {
    dispatch({ type: "ORDERS_USER_REQUEST" })
    try {        
        const { data } = await Axios.get(`http://localhost:5000/api/orders/user/${userId}`);
        dispatch({ type: "ORDERS_USER_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "ORDERS_USER_FAIL", payload: error.message });
    }
} */

const importImage = (userId, orderId, itemName, filesName) => async (dispatch, getState) => {
    dispatch({ type: "ORDER_PHOTO_REQUEST" })
    try {
        const { data } = await Axios.put(`http://localhost:5000/api/orders/photoupload/${orderId}&${itemName}`, { filesName: filesName });
        dispatch({ type: "ORDER_PHOTO_SUCCESS", payload: data });
        dispatch(detailsOrder(orderId));
        dispatch(getInfos(userId));
    } catch (error) {
        dispatch({ type: "ORDER_PHOTO_FAIL", payload: error.message });
    }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: "ORDER_DETAILS_REQUEST", payload : orderId })
    try {
        const { data } = await Axios.get(`http://localhost:5000/api/orders/${orderId}`);
        dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "ORDER_DETAILS_FAIL", payload: error.message });
    }
}

/* const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
        dispatch({ type: "ORDER_PAY_REQUEST", payload: paymentResult });
        const { data } = await Axios.put("http://localhost:5000/api/orders/" + order._id + "/pay", paymentResult );
        dispatch({ type: "ORDER_PAY_SUCCESS", payload: data })
  } catch (error) {
    dispatch({ type: "ORDER_PAY_FAIL", payload: error.message });
  }
}

const resetPayOrder = () => (dispatch) => {
    dispatch({ type: "ORDER_PAY_RESET" })
} */

export { createOrder, /* resetPayOrder, */  detailsOrder, resetOrder, importImage, /*recupUserOrders, listMyOrders, listOrders, deleteOrder  */};