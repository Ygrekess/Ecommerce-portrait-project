function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {
    switch (action.type) {   
        case "CART_ADD_ITEM":
            const productExist = state.cartItems.find(x => x._id === action.payload._id);
            if (productExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x._id === productExist._id ? {...productExist, qty: Number(productExist.qty) + action.payload.qty } : x),
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload], 
            };
        
        case "CART_SET_QTY":
            const product = state.cartItems.find(x => x._id === action.payload._id);
            return {
                ...state,
                cartItems: state.cartItems.map(x => x._id === product._id ? { ...product, qty: action.payload.qty } : x),
            };
        
        case "CART_REMOVE_ITEM":
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x._id !== action.payload._id),
            };
        
        case "CART_SAVE_SHIPPING":
            return { ...state, shipping: action.payload };
        
        case "CART_SAVE_PAYMENT":
            return { ...state, payment: action.payload };
        
        case "CART_RESET_ITEMS":
            return { cartItems: [], shipping: {}, payment: {} }; 
        
        default:
            return state;
    }
}

export { cartReducer };