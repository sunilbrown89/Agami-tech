import axios from "axios";
import { toast } from "react-hot-toast";
export const signUpRequest = () => ({
  type: "SIGNUP_REQUEST",
});

export const signUpSuccess = () => ({
  type: "SIGNUP_SUCCESS",
});

export const signUpFailure = (error) => ({
  type: "SIGNUP_FAILURE",
  payload: error,
});


export const signUpAuth = (userData) => {
  return async (dispatch) => {
    dispatch(signUpRequest());
    try {
      const response =await axios.post(
        "https://agami-tech.onrender.com/api/auth/signup",
        userData
      );
      dispatch(signUpSuccess());
      toast.success(response?.data?.message);
    } catch (error) {
      dispatch(signUpFailure(error));
      toast.error("Something went wrong");
      throw error;
    }
  };
};
