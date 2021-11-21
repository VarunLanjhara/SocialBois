import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingPosts } from "../../actions/posts.js";
import PostBody from "../../components/Posts/PostsBody.js";
import "./Trending.css";

const Trending = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const trendingPosts = useSelector((posts) => posts.posts);
  useEffect(() => {
    dispatch(getTrendingPosts());
  }, [dispatch]);

  console.log(trendingPosts);

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
      <div className="Posts">
        {trendingPosts.map((post, index) => (
          <PostBody post={post} key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Trending;
