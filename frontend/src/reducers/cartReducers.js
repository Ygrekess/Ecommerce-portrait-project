function cartReducer(state = { cartItems: [], cookieItems: [], shipping: {}, payment: {} }, action) {
    switch (action.type) {   
        case "CART_ADD_ITEM":
            const productExistInCookie = state.cookieItems.find(x => x._id === action.payload._id);
            if (productExistInCookie) {
                return {
                    ...state,
                    cookieItems: state.cookieItems.map(x => x._id === productExistInCookie._id ? { _id: productExistInCookie._id, qty: Number(productExistInCookie.qty) + action.payload.qty } : x)
                };
            }
            return {
                ...state,
                cookieItems: [...state.cookieItems, { _id: action.payload._id, qty: action.payload.qty }], 
            };
        case "CHECK_CART_ITEM_EMPTY":
            return {
                ...state,
                cookieItems : state.cookieItems.filter(x => x.qty !== 0)
            }
        
        case "CART_DETAILS_ITEM":
            return {
                ...state,
                cartItems: action.payload,
            };
        
/*         case "CART_DETAILS_ITEM":
            console.log(action)
            const productExist = state.cartItems.find(x => x._id === action.payload._id);
            if (productExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x._id === productExist._id ? { ...productExist, qty: Number(productExist.qty) + action.payload.qty } : x),
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload], 
            }; */
        
        case "CART_SET_QTY":
            const product = state.cookieItems.find(x => x._id === action.payload._id);
            return {
                ...state,
                cookieItems: state.cookieItems.map(x => x._id === product._id ? { ...product, qty: action.payload.qty } : x),
            };
        
        case "CART_REMOVE_ITEM":
            return {
                ...state,
                cookieItems: state.cookieItems.filter(x => x._id !== action.payload._id),
            };
        
        case "CART_SAVE_SHIPPING":
            return { ...state, shipping: action.payload };
        
        case "CART_SAVE_PAYMENT":
            console.log(action.payload)
            return { ...state, payment: action.payload };
        
        case "CART_RESET_ITEMS":
            return { cookieItems: [], shipping: {}, payment: {} }; 
        
        default:
            return state;
    }
}

export { cartReducer };