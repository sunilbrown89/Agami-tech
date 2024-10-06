const initialState = {
  userDetails: null,
  loading: false,
  error: null,
};

const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_DETAILS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_USER_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        userDetails: action.payload,
      };
    case "GET_USER_DETAILS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userDetailsReducer;
