import * as api from "../api/index.js";

export const signIn = (databoi, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(databoi);
    dispatch({
      type: "AUTH",
      data,
    });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const signUp = (databoi, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(databoi);
    dispatch({
      type: "AUTH",
      data,
    });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};
