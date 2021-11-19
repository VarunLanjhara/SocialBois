import { combineReducers } from "redux";
import { posts } from "./posts.js";
import { authReducer } from "./auth.js";

export default combineReducers({
  posts,
  authReducer,
});
