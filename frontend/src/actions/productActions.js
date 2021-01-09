import { DataSync } from 'aws-sdk';
import Axios from 'axios';

const listProducts = (offset, per_page) => async (dispatch) => {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    try {
      const { data } = await Axios.get('http://localhost:5000/api/products/list', { params: { offset: offset, per_page: per_page } });
      dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
  } catch (error) {
      dispatch({ type: "PRODUCT_LIST_FAIL", payload: error.message });
  }
}

const resetListProducts = () => (dispatch) => {
    dispatch({ type: "PRODUCT_LIST_RESET" });
}

const productDetails = (productId, slug, faceNumber) => async (dispatch) => {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
    try {
        const { data } = await Axios.get('http://localhost:5000/api/products/details', { params: { productId: productId, slug: slug, faceNumber: faceNumber } });
        console.log(data)
      dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
  } catch (error) {
      dispatch({ type: "PRODUCT_DETAILS_FAIL", payload: error.message });
  }
}

export { listProducts, productDetails, resetListProducts };