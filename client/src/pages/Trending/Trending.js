import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingPosts } from "../../actions/posts.js";
import PostBody from "../../components/Posts/PostsBody.js";
import "./Trending.css";
import jwt_decode from "jwt-decode";
import { getUserById } from "../../actions/auth.js";

const Trending = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const trendingPosts = useSelector((posts) => posts.posts);
  useEffect(() => {
    dispatch(getTrendingPosts());
    setTimeout(() => {
      setloading(false);
    }, [1000]);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      document.title = "SocialBois-Trending";
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  let decodedtoken = "";

  user ? (decodedtoken = jwt_decode(user.token)) : navigate("/auth");

  const currentuser = useSelector((user) => user.authReducer);
  useEffect(() => {
    dispatch(getUserById(decodedtoken.id));
  }, [dispatch]);

  return (
    <div>
      <Navbar user={currentuser} />
      <div className="Posts">
        {trendingPosts.map((post, index) => (
          <PostBody
            post={post}
            key={index}
            user={currentuser}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default Trending;
