const initialState = {
  loading: false,
  error: null,
};

const authSignInReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "SIGNIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authSignInReducer;
