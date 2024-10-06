import axios from "axios";
import { toast } from "react-hot-toast";
export const likeDislikeCommentPostRequest = () => ({
  type: "LIKEDISLIKECOMMENT_POST_REQUEST",
});

export const likeDislikeCommentPostSuccess = () => ({
  type: "LIKEDISLIKECOMMENT_POST_SUCCESS",
});

export const likeDislikeCommentPostFailure = (error) => ({
  type: "LIKEDISLIKECOMMENT_POST_FAILURE",
  payload: error,
});

export const likeDislikeCommentPost = (commentId,blogId,reactionType) => {
  const accessToken = localStorage.getItem("accessToken");
  return async (dispatch) => {
    dispatch(likeDislikeCommentPostRequest());
    try {
      const response = await axios.put(
        `https://agami-tech.onrender.com/api/blogs/${blogId}/comments/${commentId}/comment-reaction`,
        {reaction:reactionType.reaction},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(likeDislikeCommentPostSuccess());
      toast.success(response?.data?.message);
    } catch (error) {
      dispatch(likeDislikeCommentPostFailure(error));
      toast.error("Failed to added your comment reaction");
    }
  };
};
