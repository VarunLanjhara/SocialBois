import React, { useEffect, useState } from "react";
import "./SinglePost.css";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../actions/posts.js";
import { useNavigate } from "react-router-dom";
import PostBody from "../../components/Posts/PostsBody";

const SinglePost = () => {
  const [loading, setloading] = useState(true);
  console.log(loading);
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const params = useParams();
  const post = useSelector((posts) => posts.posts);
  useEffect(() => {
    dispatch(getSinglePost(params.postid));
    setTimeout(() => {
      setloading(false);
    }, [1000]);
  }, [dispatch, params, loading]);
  console.log(post);
  useEffect(() => {
    if (user) {
      document.title = `${post.body}`;
      console.log("User is there");
    } else {
      navigate("/auth");
    }
  }, [user, navigate, post]);

  return (
    <div>
      <Navbar user={user} />
      <div className="SinglePost">
        <PostBody post={post} loading={loading} user={user} />
      </div>
    </div>
  );
};

export default SinglePost;
