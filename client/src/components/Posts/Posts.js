import React, { useEffect, useState } from "react";
import "./Posts.css";
import { Avatar, TextField } from "@mui/material";
import PostBody from "./PostsBody.js";
import { getPosts } from "../../actions/posts.js";
import { useDispatch, useSelector } from "react-redux";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((posts) => posts.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="Posts">
      <div className="topstuff">
        <Avatar
          alt=""
          sx={{ width: 54, height: 54, marginLeft: "20px", marginTop: "20px" }}
        />
        <TextField
          id="outlined-basic"
          label="Create Blog"
          variant="outlined"
          style={{ marginLeft: "20px", marginTop: "20px", width: "480px" }}
        />
      </div>
      {posts.map((post,index) => (
          <PostBody key = {index} post = {post}/>
      ))}
    </div>
  );
};

export default Posts;
