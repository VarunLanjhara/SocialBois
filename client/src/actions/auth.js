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

export const getUserByName = (name) => async (dispatch) => {
  try {
    const { data } = await api.getUserByName(name);
    dispatch({
      type: "GET_USER",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile = (id, dataa) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, dataa);
    dispatch({
      type: "UPDATE_USER",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const followUser = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.followUser(id, userId);
    dispatch({
      type: "FOLLOW_USER",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};
