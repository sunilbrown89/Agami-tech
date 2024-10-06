import axios from "axios";
import { toast } from "react-hot-toast";
export const createPostRequest = () => ({
  type: "CREATE_POST_REQUEST",
});

export const createPostSuccess = () => ({
  type: "CREATE_POST_SUCCESS",
});

export const createPostFailure = (error) => ({
  type: "CREATE_POST_FAILURE",
  payload: error,
});

export const createPost = (postData) => {
  const accessToken = localStorage.getItem("accessToken");
  return async (dispatch) => {
    dispatch(createPostRequest());
    try {
      const response =await axios.post(
        "https://agami-tech.onrender.com/api/blogs/create-blog",
        postData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(createPostSuccess());
      // console.log("response===>create", response);
      toast.success(response?.data?.message);
    } catch (error) {
      dispatch(createPostFailure(error));
      toast.error("Failed to Create");
    }
  };
};
