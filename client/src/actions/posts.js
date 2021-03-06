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

export const createPosts = (databoi) => async (dispatch) => {
  try {
    const { data } = await api.createPosts(databoi);
    dispatch({
      type: "CREATE",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePosts = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePosts(id, post);
    dispatch({
      type: "UPDATE",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletePosts = (id) => async (dispatch) => {
  try {
    await api.deletePosts(id);
    dispatch({
      type: "DELETE",
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const likePosts = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.likePosts(id, userId);
    dispatch({
      type: "LIKE",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTrendingPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTrendingPosts();
    dispatch({
      type: "FETCH_TRENDING",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

// export const getSinglePost = (postid) => async (dispatch) => {
//   try {
//     const { data } = await api.fetchSinglePost(postid);
//     dispatch({
//       type: "FETCH_SINGLE",
//       payload: data,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const getUserPosts = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserposts(id);
    dispatch({
      type: "GET_USER_POSTS",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

// export const postComment = (id, user, comment) => async (dispatch) => {
//   try {
//     const { data } = await api.commentOnPost(id, user, comment);
//     dispatch({
//       type: "POST_COMMENT",
//       data,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const searchQuery = (name) => async (dispatch) => {
  try {
    const { data } = await api.searchQuery(name);
    dispatch({
      type: "SEARCH",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};
