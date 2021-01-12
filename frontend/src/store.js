import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { passwordCheckReducer, passwordUpdateReducer, userDetailsReducer, userInfosReducer, userInfosUpdateReducer, userListReducer, userNameUpdateReducer, userRegisterReducer, userSigninReducer } from './reducers/userReducers';
import { recupProductDetails, recupProductsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { recupCountReducer } from './reducers/dataReducers';
import { orderCreateReducer, orderDetailsReducer, orderImageReducer, orderListReducer, orderPayReducer /* ordersUserReducer */ } from './reducers/orderReducers';

const userInfo = Cookie.getJSON('userInfo') || null;
const cookieItems = Cookie.getJSON('cartItems') || [];
const shipping = Cookie.getJSON('shipping') || {};
const payment = Cookie.getJSON('payment') || {};

const initialState = {
    cart: { 
        cartItems: [],
        cookieItems,
        shipping, 
        payment
    },
    userSignin: {
        userInfo
    },
};


const reducer = combineReducers({
    userInfos: userInfosReducer,
    updateUserInfos: userInfosUpdateReducer, 
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    checkPassword: passwordCheckReducer,
    updatePassword: passwordUpdateReducer,
    updateUserName: userNameUpdateReducer,
    listProducts: recupProductsReducer,
    detailsProduct: recupProductDetails,
    cart: cartReducer,
    countData: recupCountReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    userDetails: userDetailsReducer,
    payOrder: orderPayReducer,
    photoImport: orderImageReducer,
    listOrders: orderListReducer,
    listUsers: userListReducer
    //userOrders: ordersUserReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

//configureStore.subscribe(() => console.log(configureStore.getState()))

export default configureStore;