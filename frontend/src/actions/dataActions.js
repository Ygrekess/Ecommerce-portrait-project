import Axios from 'axios';

const countCollection = (collName) => async (dispatch) => {
    dispatch({ type: "DATA_COUNT_REQUEST" });
    try {
        const { data } = await Axios.get(`/api/${collName}/count`);
        dispatch({ type: "DATA_COUNT_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "DATA_COUNT_FAIL", payload: error.message });
  }
}

export { countCollection }