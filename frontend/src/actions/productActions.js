import { DataSync } from 'aws-sdk';
import Axios from 'axios';

const listProducts = (skip) => async (dispatch) => {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    try {
      const { data } = await Axios.get('http://localhost:5000/api/products/list', { params: { offset: skip } });
      dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
  } catch (error) {
      dispatch({ type: "PRODUCT_LIST_FAIL", payload: error.message });
  }
}

const resetListProducts = () => (dispatch) => {
    dispatch({ type: "PRODUCT_LIST_RESET" });
}

const productDetails = (slug, faceNumber) => async (dispatch) => {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
    try {
      const { data } = await Axios.get('http://localhost:5000/api/products/details', { params: { slug: slug, faceNumber: faceNumber } });
      dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
  } catch (error) {
      dispatch({ type: "PRODUCT_DETAILS_FAIL", payload: error.message });
  }
}

export { listProducts, productDetails, resetListProducts };