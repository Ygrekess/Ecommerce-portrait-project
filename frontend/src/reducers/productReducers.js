function recupProductsReducer(state = { loading: true, products: [] }, action) {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { loading: true, products: [] };
    case "PRODUCT_LIST_SUCCESS":
      return { loading: false, products: action.payload };
    case "PRODUCT_LIST_FAIL":
      return { loading: false, error: action.payload };
    case "PRODUCT_LIST_RESET":
      return { loading: true, products: [] };
    case "PRODUCT_DELETE_SUCCESS":
      return { loading: true, deleteSuccess: true, products: [] };   
    default:
      return state;
  }
}

function recupProductDetails(state = { loading: true, product: {}, similarProducts: [] }, action) {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { loading: true, product: {} };
    case "PRODUCT_DETAILS_SUCCESS":
      return { loading: false, product: action.payload.product, similarProducts: action.payload.similarProducts.filter( similarProduct => similarProduct._id !== action.payload.product._id) };
    case "PRODUCT_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "PRODUCT_UPDATE_SUCCESS":
      return {loading: true, product: action.payload.product, updateSuccess : true}
    default:
      return state;
  }
}

export {
  recupProductsReducer,
  recupProductDetails,
};