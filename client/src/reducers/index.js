import { combineReducers } from "redux";
import { posts } from "./posts.js";
import { authReducer } from "./auth.js";
import { profileReducer } from "./profile.js";
import { singlepost } from "./singlepost.js";

export default combineReducers({
  posts,
  authReducer,
  profileReducer,
  singlepost,
});
