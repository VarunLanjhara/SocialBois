import React, { useEffect, useState } from "react";
import "./Posts.css";
import { Avatar, TextField } from "@mui/material";
import PostBody from "./PostsBody.js";
import { getPosts } from "../../actions/posts.js";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import FileBase64 from "react-file-base64"
import { createPosts } from '../../actions/posts'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((posts) => posts.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const [open, setOpen] = React.useState(false);
  const [postData,setpostData] = useState({author:"",body:"",file:""})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createPost = (e) => {
    setOpen(false);
    console.log(postData.file)
  }

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
          onClick={handleClickOpen}
          onKeyDown={handleClickOpen}
        />
      </div>
      {posts.map((post, index) => (
        <PostBody key={index} post={post} />
      ))}

      {/* dialog stuff here */}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Create Post :)"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <TextField id="outlined-basic" label="Creator" onChange={(e) => setpostData({...postData,author:e.target.value})}  variant="outlined" style = {{width:"530px",marginBottom:"20px",marginTop:"10px"}}/>
          <TextField id="outlined-basic" label="Body" onChange={(e) => setpostData({...postData,body:e.target.value})} variant="outlined" multiline rows={4} style = {{width:"530px",marginBottom:"20px"}}/>
          <FileBase64  type = "file"  multiple = {false} accept="image/png, image/gif, image/jpeg" onDone = {({base64}) => setpostData({...postData,file:base64})}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={createPost}>Create</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Posts;
