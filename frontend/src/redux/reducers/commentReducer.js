// reducers/commentReducer.js
const initialState = {
  loading: false,
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMMENT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_COMMENT_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "ADD_COMMENT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default commentReducer;
