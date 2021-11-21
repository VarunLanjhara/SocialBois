import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
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
