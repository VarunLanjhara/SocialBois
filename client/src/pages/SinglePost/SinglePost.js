import React, { useEffect, useState } from "react";
import "./SinglePost.css";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../actions/singlepost.js";
import { useNavigate } from "react-router-dom";
import PostBody from "../../components/Posts/PostsBody";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Avatar, Tooltip } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import jwt_decode from "jwt-decode";
import { getUserById } from "../../actions/auth";
import { getSinglePost } from "../../actions/singlepost";

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
  const post = useSelector((posts) => posts.singlepost);
  useEffect(() => {
    dispatch(getSinglePost(params.postid));
    setTimeout(() => {
      setloading(false);
    }, [1000]);
  }, [dispatch, params]);
  useEffect(() => {
    if (user) {
      document.title = `${post.body}`;
    } else {
      navigate("/auth");
    }
  }, [user, navigate, post]);

  let decodedtoken = "";

  user ? (decodedtoken = jwt_decode(user.token)) : navigate("/auth");

  const currentuser = useSelector((user) => user.authReducer);
  useEffect(() => {
    dispatch(getUserById(decodedtoken.id));
  }, [dispatch]);

  const [open, setOpen] = React.useState(false);
  const [openerrror, setOpenerror] = React.useState(false);

  const handleClickerror = () => {
    setOpenerror(true);
  };

  const handleCloseerror = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenerror(false);
  };

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
    if (commentdata.length <= 4 || commentdata.length >= 40) {
      handleClickerror();
    } else {
      dispatch(postComment(post._id, currentuser, commentdata));
      handleClick();
    }
  };

  if (post.length === 0) {
    navigate("/");
  }

  return (
    <div>
      <Navbar user={currentuser} />
      <div className="SinglePost">
        <PostBody post={post} loading={loading} user={currentuser} />
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
        <div
          style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}
        >
          <Tooltip arrow title={currentuser.username}>
            <Avatar
              style={{ cursor: "pointer", width: "50px", height: "50px" }}
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
                paddingLeft: "15px",
                marginLeft: "10px",
                paddingTop: "4px",
              }}
              placeholder={`Enter shit here ${currentuser.username} :)`}
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
                    style={{ cursor: "pointer", width: "50px", height: "50px" }}
                    src={comment.user.pfp}
                    onClick={() => {
                      navigate(`/profile/${comment.user.username}`);
                    }}
                  />
                </Tooltip>
                <p
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    fontSize: "16px",
                    position: "relative",
                    top: "-19px",
                    left: "10px",
                  }}
                >
                  {comment.user.username}
                </p>
                <p
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "16px",
                    position: "relative",
                    top: "6px",
                    left: "-32px",
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

      {/* comment error alert here */}

      <Snackbar
        open={openerrror}
        autoHideDuration={6000}
        onClose={handleCloseerror}
      >
        <Alert
          onClose={handleCloseerror}
          severity="error"
          sx={{ width: "100%" }}
        >
          Comment length must be greater than 4 letters and must be smaller than
          40 letters
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SinglePost;
