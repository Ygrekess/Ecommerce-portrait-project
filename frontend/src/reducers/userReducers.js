function userInfosReducer(state = { loading: true, userDetails: {}, userOrders: [] }, action) {
  switch (action.type) {
    case "USER_INFOS_REQUEST":
      return { loading: true, userDetails: {} };
    case "USER_INFOS_SUCCESS":
      console.log(action.payload)
      return { loading: false, userDetails: action.payload.user, userOrders: action.payload.orders };
    case "USER_INFOS_FAIL":
      return { loading: false, error: action.payload };
    case "USER_INFOS_RESET":
      return { loading: true, userDetails: {} };
    default: return state;
  }
}

function userInfosUpdateReducer(state = { loading: true, success : false }, action) {
  switch (action.type) {
    case "USER_UPDATE_INFOS_REQUEST":
      return { loading: true };
    case "USER_UPDATE_INFOS_SUCCESS":
      return { loading: false, success : true };
    case "USER_UPDATE_INFOS_FAIL":
      return { loading: false, error: action.payload };
    case "USER_UPDATE_INFOS_RESET":
      return {};
    default: return state;
  }
}

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case "USER_SIGNIN_REQUEST":
      return { loading: true };
    case "USER_SIGNIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_SIGNIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default: return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function passwordCheckReducer(state = { loading: true, validate : false }, action) {
  switch (action.type) {
    case "CHECK_PASSWORD_REQUEST":
      return { loading: true };
    case "CHECK_PASSWORD_SUCCESS":
      return { loading: false, validate: true };
    case "CHECK_PASSWORD_FAIL":
      return { loading: false, error: action.payload };
    case "CHECK_PASSWORD_RESET":
      return { loading: true, validate: false };
    default: return state;
  }
}

function passwordUpdateReducer(state = {success: false}, action) {
  switch (action.type) {
    case "UPDATE_PASSWORD_REQUEST":
      return { loading: true };
    case "UPDATE_PASSWORD_SUCCESS":
      return { loading: false, success: true };
    case "UPDATE_PASSWORD_FAIL":
      return { loading: false, error: action.payload };
    case "UPDATE_PASSWORD_RESET":
      return { loading : true, success : false}
    default: return state;
  }
}

function userNameUpdateReducer(state = { success : false}, action) {
  switch (action.type) {
    case "UPDATE_USERNAME_REQUEST":
      return { loading: true };
    case "UPDATE_USERNAME_SUCCESS":
      return { loading: false, success: true };
    case "UPDATE_USERNAME_FAIL":
      return { loading: false, error: action.payload.message };
    case "UPDATE_USERNAME_RESET":
      return { loading : true, success : false}
    default: return state;
  }
}
export { userInfosReducer, userInfosUpdateReducer, userSigninReducer, userRegisterReducer, passwordCheckReducer, passwordUpdateReducer, userNameUpdateReducer };