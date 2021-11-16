import * as api from "../api/index.js";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({
      type: "FETCH",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
