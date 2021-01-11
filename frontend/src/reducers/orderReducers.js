function orderCreateReducer(state = {}, action) {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return { loading: true };
    case "ORDER_CREATE_SUCCESS":
      return { loading: false, order: action.payload, success: true };
    case "ORDER_CREATE_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_RESET":
      return { loading: false, order: {}, success: false};
    default: return state;
  }
}

function orderListReducer(state = { loading: true, orders: [] }, action) {
  switch (action.type) {
    case "ORDER_LIST_REQUEST":
      return { loading: true, orders: [] };
    case "ORDER_LIST_SUCCESS":
      return { loading: false, orders: action.payload };
    case "ORDER_LIST_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_LIST_RESET":
      return { loading: true, orders: [] };
    default:
      return state;
  }
}

function orderDetailsReducer(state = { loading: true }, action) {
  switch (action.type) {
    case "ORDER_DETAILS_REQUEST":
      return { loading: true };
    case "ORDER_DETAILS_SUCCESS":
      return { loading: false, order: action.payload.data };
    case "ORDER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_RESET":
      return { loading: true };
    default: return state;
  }
}

/* function ordersUserReducer(state = { loading: true }, action) {
  switch (action.type) {
    case "ORDERS_USER_REQUEST":
      return { loading: true };
    case "ORDERS_USER_SUCCESS":
      return { loading: false, orders: action.payload.data };
    case "ORDERS_USER_FAIL":
      return { loading: false, error: action.payload };
    default: return state;
  }
} */

function orderImageReducer(state = { loading: true }, action) {
  switch (action.type) {
    case "ORDER_PHOTO_REQUEST":
      return { loading: true };
    case "ORDER_PHOTO_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_PHOTO_FAIL":
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function orderPayReducer(state = {
  order: {
    orderItems: [],
    shipping: {},
    payment: {}
  }
}, action) {
  switch (action.type) {
    case "ORDER_PAY_REQUEST":
      return { loading: true };
    case "ORDER_PAY_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_PAY_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_PAY_RESET":
      return { loading: false, success: false };
    default: return state;
  }
}

export { orderCreateReducer, orderListReducer, orderDetailsReducer, orderPayReducer, orderImageReducer, /* ordersUserReducer */ };