function recupCountReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "DATA_COUNT_REQUEST":
      return { loadingData: true, count: 0 };
    case "DATA_COUNT_SUCCESS":
      return { loadingData: false, count: action.payload };
    case "DATA_COUNT_FAIL":
      return { loadingData: false, errorData: action.payload };
    default:
      return state;
  }
}

export { recupCountReducer };