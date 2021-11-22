import React, { useEffect, useState } from "react";
import "./SinglePost.css";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../actions/posts.js";
import { useNavigate } from "react-router-dom";
import PostBody from "../../components/Posts/PostsBody";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { Avatar, Tooltip } from "@mui/material";

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
  }, [dispatch, params]);
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
        <p
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "24px",
            marginTop: "6px",
          }}
        >
          Write a comment
        </p>
        <div style={{ display: "flex", marginTop: "20px" }}>
          <Tooltip arrow title="Varun">
            <Avatar
              style={{ cursor: "pointer", width: "42px", height: "42px" }}
            />
          </Tooltip>
          <Paper
            component="form"
            sx={{
              width: 600,
              height: "40px",
              marginLeft: "10px",
            }}
          >
            <InputBase
              sx={{ width: "600px", paddingLeft: "20px", marginLeft: "10px" }}
              placeholder="Enter shit here varun :)"
            />
          </Paper>
        </div>
        <div
          style={{ display: "flex", marginTop: "25px", marginBottom: "15px" }}
        >
          <Tooltip arrow title="Varun">
            <Avatar
              style={{ cursor: "pointer", width: "42px", height: "42px" }}
            />
          </Tooltip>
          <p
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              position: "relative",
              top: "8px",
              left: "10px",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into
          </p>
        </div>
        <div
          style={{ display: "flex", marginTop: "25px", marginBottom: "25px" }}
        >
          <Tooltip arrow title="Varun">
            <Avatar
              style={{ cursor: "pointer", width: "42px", height: "42px" }}
            />
          </Tooltip>
          <p
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              position: "relative",
              top: "8px",
              left: "10px",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
