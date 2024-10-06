import axios from "axios";
import { toast } from "react-hot-toast";
export const likeDislikePostRequest = () => ({
  type: "LIKEDISLIKE_POST_REQUEST",
});

export const likeDislikePostSuccess = () => ({
  type: "LIKEDISLIKE_POST_SUCCESS",
});

export const likeDislikePostFailure = (error) => ({
  type: "LIKEDISLIKE_POST_FAILURE",
  payload: error,
});

export const likeDislikePost = (blogId,reactionType) => {
  const accessToken = localStorage.getItem("accessToken");
  return async (dispatch) => {
    dispatch(likeDislikePostRequest());
    try {
      const response = await axios.post(
        `https://agami-tech.onrender.com/api/blogs/${blogId}/blog-reaction`,
        {reaction:reactionType.reaction},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(likeDislikePostSuccess());
      toast.success(response?.data?.message);
    } catch (error) {
      dispatch(likeDislikePostFailure(error));
      toast.error("Failed to added your reaction");
    }
  };
};
