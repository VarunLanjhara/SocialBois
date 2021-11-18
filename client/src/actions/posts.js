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
  try{
    const {data} = await api.createPosts(databoi)
    dispatch({
      type: "CREATE",
      payload: data,
    });
  }
  catch(err){
    console.log(err)
  }
}