

import axios from "axios";
export const getUserDetailsRequest = () => ({
  type: "GET_USER_DETAILS_REQUEST",
});

export const getUserDetailsSuccess = (userDetails) => ({
  type: "GET_USER_DETAILS_SUCCESS",
  payload: userDetails,
});

export const getUserDetailsFailure = (error) => ({
  type: "GET_USER_DETAILS_FAILURE",
  payload: error,
});

export const getUserDetails = () => {
  const accessToken = localStorage.getItem("accessToken");
  return async (dispatch) => {
    dispatch(getUserDetailsRequest());
    try {
      const response = await axios.get(
        "https://agami-tech.onrender.com/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(getUserDetailsSuccess(response?.data));
    } catch (error) {
      dispatch(getUserDetailsFailure(error));
    }
  };
};
