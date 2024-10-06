import axios from "axios";
import { toast } from "react-hot-toast";
export const updatePostRequest = () => ({
  type: "UPDATE_POST_REQUEST",
});

export const updatePostSuccess = () => ({
  type: "UPDATE_POST_SUCCESS",
});

export const updatePostFailure = (error) => ({
  type: "UPDATE_POST_FAILURE",
  payload: error,
});

export const updatePost = (_id, postData) => {
  const accessToken = localStorage.getItem("accessToken");
  return async (dispatch) => {
    dispatch(updatePostRequest());
    try {
     const response = await axios.put(
        `https://agami-tech.onrender.com/api/blogs/update-blog/${_id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(updatePostSuccess());
      toast.success(response?.data?.message);
    } catch (error) {
      dispatch(updatePostFailure(error));
      toast.error("Failed to Update");
    }
  };
};
