import axios from "axios";
import { toast } from "react-hot-toast";
export const signInRequest = () => ({
  type: "SIGNIN_REQUEST",
});

export const signInSuccess = () => ({
  type: "SIGNIN_SUCCESS",
});

export const signInFailure = (error) => ({
  type: "SIGNIN_FAILURE",
  payload: error,
});

export const authSignIn = (userData) => {
  return async (dispatch) => {
    dispatch(signInRequest());
    try {
      const response = await axios.post(
        "https://agami-tech.onrender.com/api/auth/login",
        userData
      );
      dispatch(signInSuccess());
      const accessToken = response?.data?.token;
      dispatch(setAccessToken(accessToken));

      toast.success(response?.data?.message);
    } catch (error) {
      dispatch(signInFailure(error));
      toast.error("Soemthing went wrong");
      throw error;
    }
  };
};
export const setAccessToken = (accessToken) => {
  return () => {
    localStorage.setItem("accessToken", accessToken);
  };
};
