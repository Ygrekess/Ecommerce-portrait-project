import Axios from 'axios';
import Cookie from 'js-cookie';

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await Axios.get('http://localhost:5000/api/products/' + productId);
        dispatch({
        type: "CART_ADD_ITEM",
        payload: {
            _id: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
        });    
        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {
        //
    }
}

const setQty = (productId, qty) => (dispatch, getState) => {
    try {
        dispatch({
        type: "CART_SET_QTY",
        payload: {
            _id: productId,
            qty
        }
        });    
        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {
        //
    }
}

const removeFromCart = (product) => (dispatch, getState) => {
    dispatch({
        type: "CART_REMOVE_ITEM",
        payload: {
            _id: product._id,
        }
    });
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch, getState) => {
    dispatch({
        type: "CART_SAVE_SHIPPING",
        payload: data,
    });
    const { cart: { shipping } } = getState();
    console.log(shipping)
    Cookie.set("shipping", JSON.stringify(shipping));
}

const savePayment = (data) => (dispatch, getState) => {
    dispatch({
        type: "CART_SAVE_PAYMENT",
        payload: data,
    });
    const { cart: { payment } } = getState();
    Cookie.set("payment", JSON.stringify(payment));
}

const resetCart = () => (dispatch, getState) => {
    dispatch({ type: "CART_RESET_ITEMS" })
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

export { addToCart, removeFromCart, setQty, saveShipping, savePayment, resetCart };