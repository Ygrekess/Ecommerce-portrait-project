import Axios from "axios";
import Cookie from 'js-cookie';

/* export const userSignin = (infos) => {
    return {
        type: 'USER_SIGNIN',
        payload: infos
    }
} */
const listUsers = (offset, per_page) => async (dispatch) => {
    dispatch({ type: "USER_LIST_REQUEST" });
    try {
      const { data } = await Axios.get('/api/users/list', { params: { offset: offset, per_page: per_page } });
      dispatch({ type: "USER_LIST_SUCCESS", payload: data });
  } catch (error) {
      dispatch({ type: "USER_LIST_FAIL", payload: error.message });
  }
}
const resetListUsers = () => (dispatch) => {
    dispatch({ type: "USER_LIST_RESET" });
}

const getInfos = (userId) => async (dispatch) => {
  dispatch({ type: "USER_INFOS_REQUEST"});
  try {
    const { data } = await Axios.get(`/api/users/user/${userId}`);
    dispatch({ type: "USER_INFOS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_INFOS_FAIL", payload: error.message });
  }
}

const resetInfos = () => (dispatch) => {
  dispatch({ type: "USER_INFOS_RESET" });
    dispatch({ type: "USER_UPDATE_INFOS_RESET" });
}

const getDetails = (userId) => async (dispatch) => {
  dispatch({ type: "USER_DETAILS_REQUEST"});
  try {
    const { data } = await Axios.get(`/api/users/user/details/${userId}`);
    dispatch({ type: "USER_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_DETAILS_FAIL", payload: error.message });
  }
}

const updateInfos = (userId, lastname, firstname, email, phone, newsletter) => async (dispatch) => {
  dispatch({ type: "USER_UPDATE_INFOS_REQUEST"});
  try {
    await Axios.put(`/api/users/${userId}/updateinfos`, { lastname, firstname, email, phone, newsletter });
    dispatch({ type: "USER_UPDATE_INFOS_SUCCESS" });
  } catch (error) {
    dispatch({ type: "USER_UPDATE_INFOS_FAIL", payload: error.message });
  }
}

const register = (username, email, password, newsletter) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST", payload: { username, email, password, newsletter } });
  try {
    const { data } = await Axios.post("/api/users/register", { username, email, password, newsletter });
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAIL", payload: error.message });
  }
}

const signin = (username, password) => async (dispatch) => {
  dispatch({ type: "USER_SIGNIN_REQUEST", payload: { username, password } });
  try {
    const { data } = await Axios.post("/api/users/login", { username, password });
    dispatch({ type: "USER_SIGNIN_SUCCESS", payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: "USER_SIGNIN_FAIL", payload: error.message });
  }
}

const checkPassword = (userId, password) => async (dispatch) => {
  dispatch({ type: "CHECK_PASSWORD_REQUEST", payload: { userId, password } });
  try {
    const { data } = await Axios.post("/api/users/passwordcheck", { userId, password });
    dispatch({ type: "CHECK_PASSWORD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "CHECK_PASSWORD_FAIL", payload: error.message });
  }
}

const updatePassword = (userId, newPassword) => async (dispatch) => {
  dispatch({ type: "UPDATE_PASSWORD_REQUEST" });
  try {
    const { data } = await Axios.put(`/api/users/${userId}/updatepassword`, { newPassword });
    dispatch({ type: "UPDATE_PASSWORD_SUCCESS" });
    dispatch({ type: "CHECK_PASSWORD_RESET"}); 
  } catch (error) {
    dispatch({ type: "UPDATE_PASSWORD_FAIL", payload: error.message });
  } 
}

const passwordCheckReset = () => (dispatch) => {
    dispatch({ type: "CHECK_PASSWORD_RESET"});  
}

const updateUserName = (userId, newUserName) => async (dispatch) => {
  dispatch({ type: "UPDATE_USERNAME_REQUEST" });
  try {
    const { data } = await Axios.put(`/api/users/${userId}/updateusername`, { newUserName });
    dispatch({ type: "UPDATE_USERNAME_SUCCESS" });
    dispatch({ type: "UPDATE_USERNAME_RESET" });
    dispatch({ type: "CHECK_PASSWORD_RESET"});
  } catch (error) {
    dispatch({ type: "UPDATE_USERNAME_FAIL", payload: { message : "Nom d'utilisateur déjà utilisé." } });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: "USER_LOGOUT" })
}

export { listUsers, getDetails, resetListUsers, getInfos, updateInfos, resetInfos, signin, register, checkPassword, passwordCheckReset, logout, updatePassword, updateUserName};