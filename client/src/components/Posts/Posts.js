import React from "react";
import "./Posts.css";
import { Avatar, TextField } from "@mui/material";
import PostBody from "./PostsBody.js";

const Posts = () => {
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
      <PostBody />
      <PostBody />
      <PostBody />
    </div>
  );
};

export default Posts;
