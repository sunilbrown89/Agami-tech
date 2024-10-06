import axios from "axios";

export const getAllPostsRequest = () => ({
  type: "GET_ALL_POSTS_REQUEST",
});

export const getAllPostsSuccess = (posts) => ({
  type: "GET_ALL_POSTS_SUCCESS",
  payload: posts,
});

export const getAllPostsFailure = (error) => ({
  type: "GET_ALL_POSTS_FAILURE",
  payload: error,
});

export const searchPostsRequest = () => ({
  type: "SEARCH_POSTS_REQUEST",
});

export const searchPostsSuccess = (posts) => ({
  type: "SEARCH_POSTS_SUCCESS",
  payload: posts,
});

export const searchPostsFailure = (error) => ({
  type: "SEARCH_POSTS_FAILURE",
  payload: error,
});

export const getAllPosts = () => {
  return async (dispatch) => {
    dispatch(getAllPostsRequest());
    try {
      const response = await axios.get(
        "https://agami-tech.onrender.com/api/blogs/get-all-users-blogs/"
      );
      dispatch(getAllPostsSuccess(response.data));
    } catch (error) {
      dispatch(getAllPostsFailure(error));
    }
  };
};

export const searchPosts = (query) => {
  return async (dispatch) => {
    dispatch(searchPostsRequest());
    try {
      const response = await axios.get(
        `https://agami-tech.onrender.com/api/blogs/?title=${query}`
      );
      if (response?.data?.length === 0) {
        dispatch(searchPostsFailure({ message: "No results found" }));
      } else {
        dispatch(searchPostsSuccess(response?.data));
      }
    } catch (error) {
      dispatch(searchPostsFailure(error));
    }
  };
};
