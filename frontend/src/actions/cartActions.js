import Axios from 'axios';
import Cookie from 'js-cookie';

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await Axios.get('http://localhost:5000/api/products/details', { params: { id: productId } });
        dispatch({
        type: "CART_ADD_ITEM",
        payload: {
            _id: data.product._id,
            name: data.product.name,
            image: data.product.image,
            price: data.product.price,
            qty
        }
        });  
        dispatch({ type: "CHECK_CART_ITEM_EMPTY" })
        const { cart: { cookieItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cookieItems));
    } catch (error) {
        //
    }
}

const recupCartDetails = () => async (dispatch, getState) => {
    const { cart: { cookieItems } } = getState();
    let payload = []
    let ids = [];
    for (let i = 0; i < cookieItems.length; i++) {
        let item = cookieItems[i];
        ids = [...ids, item._id]
    }

    try {
        const { data } = await Axios.get('http://localhost:5000/api/products/cartDetails', { params: { ids: ids } })
        for (let i = 0; i < data.products.length; i++) {
            cookieItems.map(x => x._id === data.products[i]._id ?
                payload = [...payload,
                {
                    _id: data.products[i]._id,
                    name: data.products[i].name,
                    slug: data.products[i].slug,
                    faceNumber: data.products[i].faceNumber,
                    image: data.products[i].image,
                    price: data.products[i].price,
                    qty: x.qty
                }]
                : payload
            )
        }
        dispatch({
            type: "CART_DETAILS_ITEM",
            payload: payload
        });    
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
        const { cart: { cookieItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cookieItems));
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
    const { cart: { cookieItems } } = getState();

    Cookie.set("cartItems", JSON.stringify(cookieItems));
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
    const { cart: { cookieItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cookieItems));
}

export { addToCart, removeFromCart, setQty, saveShipping, savePayment, resetCart, recupCartDetails };