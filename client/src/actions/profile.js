import * as api from "../api/index.js";

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
