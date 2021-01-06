function cartReducer(state = { cartItems: [], cookieItems: [], shipping: {}, payment: {} }, action) {
    switch (action.type) {   
        case "CART_ADD_ITEM":
/*             const productExistInCookie = state.cookieItems.find(x => x._id === action.payload._id);
            if (productExistInCookie) {
                return {
                    ...state,
                    cookieItems: state.cookieItems.map(x => x._id === productExistInCookie._id ? { ...productExistInCookie, qty: Number(productExistInCookie.qty) + action.payload.qty } : x)
                };
            } */
            return {
                ...state,
                cookieItems: [...state.cookieItems, { _id: action.payload._id, cartItemId: action.payload.cartItemId, qty: action.payload.qty }], 
            };
        case "CHECK_QTY_ITEM_NULL":
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
            const product = state.cookieItems.find(x => x.cartItemId === action.payload.cartItemId);
            return {
                ...state,
                cookieItems: state.cookieItems.map(x => x.cartItemId === product.cartItemId ? { ...product, qty: product.qty + action.payload.qty } : x),
            };
        
        case "CART_REMOVE_ITEM":
            return {
                ...state,
                cookieItems: state.cookieItems.filter(x => x.cartItemId !== action.payload.cartItemId),
            };
        
        case "CART_SAVE_SHIPPING":
            return { ...state, shipping: action.payload };
        
        case "CART_SAVE_PAYMENT":
            return { ...state, payment: action.payload };
        
        case "CART_RESET_ITEMS":
            return { cartItems: [], cookieItems: [], shipping: {}, payment: {} }; 
        
        default:
            return state;
    }
}

export { cartReducer };