const initialState = {
  loading: false,
  error: null,
};

const postCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_POST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "CREATE_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "CREATE_POST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postCreateReducer;
