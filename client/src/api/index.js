import axios from "axios";

const API = axios.create({
  baseURL: "https://socialbois.herokuapp.com",
});

export const fetchPosts = () => API.get("/posts");
export const createPosts = (data) => API.post("/posts", data);
export const updatePosts = (id, updatedPost) =>
  API.put(`/posts/${id}`, updatedPost);
export const deletePosts = (id) => API.delete(`/posts/${id}`);
export const likePosts = (id, userId) =>
  API.put(`/posts/${id}/like/`, {
    userId: userId,
  });
export const signin = (data) => API.post("/users/signin", data);
export const signup = (data) => API.post("/users/signup", data);
export const fetchTrendingPosts = () => API.get("/posts/trending");
export const fetchSinglePost = (postid) => API.get(`/posts/${postid}`);
export const getUserByName = (name) => API.get(`/users/${name}`);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const getUserposts = (id) => API.get(`/posts/currentboiposts/${id}`);
export const followUser = (id, userId) =>
  API.put(`/users/${id}/follow`, {
    userId: userId,
  });

export const commentOnPost = (id, user, comment) =>
  API.put(`/posts/${id}/comment`, {
    user: user,
    comment: comment,
  });

export const searchQuery = (name) => API.get(`/posts/find/${name}`);
export const getuserbyid = (id) => API.get(`/users/getuser/${id}`);
