// actions/commentActions.js
import axios from "axios";

import { toast } from "react-hot-toast";
export const addCommentRequest = () => ({
  type: "ADD_COMMENT_REQUEST",
});


export const addCommentSuccess = () => ({
  type: "ADD_COMMENT_SUCCESS",
});

export const addCommentFailure = (error) => ({
  type: "ADD_COMMENT_FAILURE",
  payload: error,
});


export const addComment = (postId,commentInput) => {
  const accessToken = localStorage.getItem("accessToken");
  return async (dispatch) => {
    dispatch(addCommentRequest());
    try {
      const response = await axios.post(
        `https://agami-tech.onrender.com/api/blogs/${postId}/blog-comments`,
        {content:commentInput},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(addCommentSuccess());
      toast.success(response?.data?.message);
    } catch (error) {
      dispatch(addCommentFailure(error));
      toast.error("Comment failed to add");
    }
  };
};
