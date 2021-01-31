import { DataSync } from 'aws-sdk';
import Axios from 'axios';

const listProducts = (offset = 0, per_page = 8, style = 'all' , size = 'all' , color = null, max = 100, min = 0) => async (dispatch) => {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    try {
      const { data } = await Axios.get('/api/products/list', { params: { style: style, size: size, color: color, max: max, min: min, offset: offset, per_page: per_page } });
      dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
  } catch (error) {
      dispatch({ type: "PRODUCT_LIST_FAIL", payload: error.message });
  }
}

const countProducts = (style , size , color = null, max = 100, min = 0) => async (dispatch) => {
    dispatch({ type: "DATA_COUNT_REQUEST" });
    try {
        const { data } = await Axios.get(`/api/products/count`, { params: { style: style, size: size, color: color, max: max, min: min } });
        dispatch({ type: "DATA_COUNT_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "DATA_COUNT_FAIL", payload: error.message });
  }
}
/* const sortListProducts = async (style, size, color, max, min) => {
    try {
        const { data } = await Axios.get('/api/products/sort', { style: style, size: size, color: color, max: max, min: min })
        console.log(data)
    } catch (error) {
        console.log(error)
    }
} */

const resetListProducts = () => (dispatch) => {
    dispatch({ type: "PRODUCT_LIST_RESET" });
}

const productDetails = (productId, slug) => async (dispatch) => {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
    try {
        const { data } = await Axios.get('/api/products/details', { params: { productId: productId, slug: slug} });
      dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
  } catch (error) {
      dispatch({ type: "PRODUCT_DETAILS_FAIL", payload: error.message });
  }
}

const addProduct = (product) => async (dispatch) => {
    dispatch({ type: "PRODUCT_ADD_REQUEST" });
    try {
        const { data } = await Axios.post("/api/products/", { product })
        console.log(data)
        dispatch({ type: "PRODUCT_ADD_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "PRODUCT_ADD_FAIL", payload: error.message });
    }  
}

const updateProduct = (product) => async (dispatch) => {
    dispatch({ type: "PRODUCT_UPDATE_REQUEST" });
    try {
        const { data } = await Axios.put(`/api/products/${product._id}`, { product })
        dispatch({ type: "PRODUCT_UPDATE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "PRODUCT_UPDATE_FAIL", payload: error.message });
    }  
}

const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: "PRODUCT_DELETE_REQUEST" });
    try {
        const { data } = await Axios.delete(`/api/products/${productId}`)
        dispatch({ type: "PRODUCT_DELETE_SUCCESS" });
    } catch (error) {
        dispatch({ type: "PRODUCT_DELETE_FAIL", payload: error.message });
    }  
}

const importProductImage = (file) => async (dispatch) => {
    const bodyFormData = new FormData();
    bodyFormData.append('image', file)
    dispatch({ type: "PRODUCT_IMAGE_ADD_REQUEST" });
    try {
        const { data } = await Axios.post(`/api/products/product-images/${file._id}`, bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        dispatch({ type: "PRODUCT_IMAGE_ADD_SUCCESS" });
    } catch (error) {
        dispatch({ type: "PRODUCT_IMAGE_ADD_FAIL", payload: error.message });
    }      
}

export { listProducts, productDetails, resetListProducts, countProducts, addProduct, importProductImage, updateProduct, deleteProduct, /* sortListProducts */ };