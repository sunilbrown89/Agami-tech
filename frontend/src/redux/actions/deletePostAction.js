import axios from "axios";
import { toast } from "react-hot-toast";
export const deletePostRequest = () => ({
  type: "DELETE_POST_REQUEST",
});

export const deletePostSuccess = () => ({
  type: "DELETE_POST_SUCCESS",
});

export const deletePostFailure = (error) => ({
  type: "DELETE_POST_FAILURE",
  payload: error,
});

export const deletePost = (id) => {
  const accessToken = localStorage.getItem("accessToken");
  return async (dispatch) => {
    dispatch(deletePostRequest());
    try {
      const response = await axios.delete(
        `https://agami-tech.onrender.com/api/blogs/delete-blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(deletePostSuccess());
      toast.success(response?.data?.message);
    } catch (error) {
      dispatch(deletePostFailure(error));
      toast.error("Failed to Delete");
    }
  };
};
