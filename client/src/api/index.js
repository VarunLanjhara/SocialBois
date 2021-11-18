import axios from "axios"

export const fetchPosts = () => axios.get("http://127.0.0.1:8000/posts")
export const createPosts = (data) => axios.post("http://127.0.0.1:8000/posts",data)
export const deletePosts = (id) => axios.delete(`http://127.0.0.1:8000/posts/${id}`)
export const likePosts = (id) => axios.put(`http://127.0.0.1:8000/posts/${id}/like/`)