import * as api from "../api/index.js";
export const getSinglePost = (postid) => async (dispatch) => {
  try {
    const { data } = await api.fetchSinglePost(postid);
    dispatch({
      type: "FETCH_SINGLE",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (id, user, comment) => async (dispatch) => {
  try {
    const { data } = await api.commentOnPost(id, user, comment);
    dispatch({
      type: "POST_COMMENT",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};
