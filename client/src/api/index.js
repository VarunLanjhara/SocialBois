import axios from "axios"

export const fetchPosts = () => axios.get("http://127.0.0.1:8000/posts")