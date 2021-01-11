import Axios from "axios";
import Cookie from 'js-cookie';
import { getInfos } from "./userActions";

const createOrder = (order) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: "ORDER_CREATE_REQUEST", payload : {order: order, userInfo: userInfo} })
    try {        
        const { data: { data: newOrder } } = await Axios.post("/api/orders", { order: order, userInfo: userInfo });
        dispatch({ type: "ORDER_CREATE_SUCCESS", payload: newOrder });
    } catch (error) {
        dispatch({ type: "ORDER_CREATE_FAIL", payload: error.message });
    }
}

const listOrders = (offset, per_page) => async (dispatch) => {
    dispatch({ type: "ORDER_LIST_REQUEST" });
    try {
      const { data } = await Axios.get('/api/orders/list', { params: { offset: offset, per_page: per_page } });
      dispatch({ type: "ORDER_LIST_SUCCESS", payload: data });
  } catch (error) {
      dispatch({ type: "ORDER_LIST_FAIL", payload: error.message });
  }
}

const resetListOrders = () => (dispatch) => {
    dispatch({ type: "ORDER_LIST_RESET" });
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

const importImage = (userId, orderId, folderName, filesName) => async (dispatch, getState) => {
    dispatch({ type: "ORDER_PHOTO_REQUEST" })
    try {
        const { data } = await Axios.put(`/api/orders/photoupload/${orderId}&${folderName}`, { filesName: filesName });
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
        const { data } = await Axios.get(`/api/orders/${orderId}`);
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

export { createOrder, /* resetPayOrder, */ resetListOrders, listOrders, detailsOrder, resetOrder, importImage, /*recupUserOrders, listMyOrders, listOrders, deleteOrder  */};