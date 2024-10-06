const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_COMMENTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_ALL_COMMENTS_SUCCESS":
      return {
        ...state,
        loading: false,
        comments: action.payload,
        error: null,
      };
    case "GET_ALL_COMMENTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default commentsDataReducer;
