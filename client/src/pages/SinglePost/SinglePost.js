import React, { useEffect, useState } from "react";
import "./SinglePost.css";
import Navbar from "../../components/Navbar/Navbar";
import "./SinglePost.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../actions/posts.js";
import PostBody from "../../components/Posts/PostsBody.js";
import { useNavigate } from "react-router-dom";

const SinglePost = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const params = useParams();
  const post = useSelector((posts) => posts.posts);
  useEffect(() => {
    dispatch(getSinglePost(params.postid));
  }, [dispatch, params]);
  if (post) {
    console.log("Post is there");
  } else {
    console.log("Post is not there");
  }
  useEffect(() => {
    if (user) {
      document.title = "SocialBois";
      console.log("User is there");
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default SinglePost;
