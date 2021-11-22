import React, { useEffect, useState } from "react";
import "./SinglePost.css";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost, postComment } from "../../actions/posts.js";
import { useNavigate } from "react-router-dom";
import PostBody from "../../components/Posts/PostsBody";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Avatar, Tooltip } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SinglePost = () => {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [commentdata, setcommentdata] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const post = useSelector((posts) => posts.posts);
  useEffect(() => {
    dispatch(getSinglePost(params.postid));
    setTimeout(() => {
      setloading(false);
    }, [1000]);
  }, [dispatch, params]);
  useEffect(() => {
    if (user) {
      document.title = `${post.body}`;
      console.log("User is there");
    } else {
      navigate("/auth");
    }
  }, [user, navigate, post]);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const comment = (event) => {
    setcommentdata("");
    event.preventDefault();
    handleClick();
    dispatch(postComment(post._id, user.result, commentdata));
  };

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
            onSubmit={comment}
          >
            <InputBase
              sx={{
                width: "600px",
                paddingLeft: "20px",
                marginLeft: "10px",
              }}
              placeholder={`Enter shit here ${user.result.username} :)`}
              onChange={(e) => setcommentdata(e.target.value)}
              value={commentdata}
            />
          </Paper>
        </div>
        {post.comments
          ? post.comments.map((comment, index) => (
              <div
                style={{
                  display: "flex",
                  marginTop: "25px",
                  marginBottom: "15px",
                }}
                key={index}
              >
                <Tooltip arrow title={comment.user.username}>
                  <Avatar
                    style={{ cursor: "pointer", width: "42px", height: "42px" }}
                    src={comment.user.pfp}
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
                  {comment.comment}
                </p>
              </div>
            ))
          : ""}
      </div>

      {/* comment alert here */}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Comment added succesfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SinglePost;
