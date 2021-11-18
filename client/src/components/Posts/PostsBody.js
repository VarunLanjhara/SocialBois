import React,{useState} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./PostsBody.css";
import { CardActionArea, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CommentIcon from "@mui/icons-material/Comment";
import { format } from "timeago.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  FacebookShareButton,
  RedditShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import Slide from "@mui/material/Slide";
import FileBase64 from "react-file-base64";
import { Button } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { deletePosts, likePosts,updatePosts } from "../../actions/posts";
import { useDispatch } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const PostBody = ({ post }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const dispatch = useDispatch()

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [opendeletealert, setOpendeletealert] = React.useState(false);

  const handleClickdeletealert = () => {
    setOpendeletealert(true);
  };

  const handleClosedeletealert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpendeletealert(false);
  };

  const SHARE_URL = "http://localhost:3000/post/";

  const [anchorElmenu, setAnchorElmenu] = React.useState(null);
  const openmenu = Boolean(anchorElmenu);
  const handleClickmenu = (event) => {
    setAnchorElmenu(event.currentTarget);
  };
  const handleClosemenu = () => {
    setAnchorElmenu(null);
  };

  const [opendialog, setOpendialog] = React.useState(false);
  const [postData, setpostData] = useState({ author: post.author, body: post.body, file: post.file });

  const handleClickOpen = () => {
    setAnchorElmenu(null);
    setOpendialog(true);
  };

  const handleCloseOpen = () => {
    setOpendialog(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  })

  const updatePost = (e) => {
    e.preventDefault()
    dispatch(updatePosts(post._id,postData))
    handleCloseOpen()
  }

  const deletePost = (e) => {
    e.preventDefault()
    setAnchorElmenu(null)
    dispatch(deletePosts(post._id))
    handleClickdeletealert()
  }

  const likePost = (e) => {
    e.preventDefault()
    dispatch(likePosts(post._id))
  }

  return (
    <div>
      <Card sx={{ maxWidth: 620 }} className="PostBody">
        <CardHeader
          avatar={
            <Tooltip arrow title={post.author}>
              <Avatar
                sx={{ bgcolor: red[500], cursor: "pointer" }}
                aria-label="recipe"
              >
                {post.author.charAt(0)}
              </Avatar>
            </Tooltip>
          }
          action={
            <IconButton aria-label="settings" onClick={handleClickmenu}>
              <MoreVertIcon />
            </IconButton>
          }
          title={post.author}
          subheader={format(post.createdAt)}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorElmenu}
          open={openmenu}
          onClose={handleClosemenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClickOpen}>Edit</MenuItem>
          <MenuItem onClick={deletePost}>Delete</MenuItem>
        </Menu>
        <CardActionArea>
          <CardMedia
            component="img"
            height="194"
            image={post.file}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton aria-label="add to favorites" onClick={likePost}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={handleClick}>
            <ShareIcon />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClose}>
              <WhatsappShareButton url={`${SHARE_URL + post._id}`}>
                <WhatsappIcon />
              </WhatsappShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <FacebookShareButton url={`${SHARE_URL + post._id}`}>
                <FacebookIcon />
              </FacebookShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <TwitterShareButton url={`${SHARE_URL + post._id}`}>
                <TwitterIcon />
              </TwitterShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <RedditShareButton url={`${SHARE_URL + post._id}`}>
                <RedditIcon />
              </RedditShareButton>
            </MenuItem>
          </Menu>
          <IconButton aria-label="share">
            <ReportProblemIcon />
          </IconButton>
          <IconButton aria-label="share">
            <CommentIcon />
          </IconButton>
        </CardActions>
      </Card>

      {/* dialog stuff here */}

      <form>
        <Dialog
          open={opendialog}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Update Post :)"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <TextField
                id="outlined-basic"
                label="Creator"
                value = {postData.author}
                onChange={(e) =>
                  setpostData({ ...postData, author: e.target.value })
                }
                variant="outlined"
                style={{
                  width: "530px",
                  marginBottom: "20px",
                  marginTop: "10px",
                }}
              />
              <TextField
                id="outlined-basic"
                label="Body"
                onChange={(e) =>
                  setpostData({ ...postData, body: e.target.value })
                }
                value = {postData.body}
                variant="outlined"
                multiline
                rows={4}
                style={{ width: "530px", marginBottom: "20px" }}
              />
              <FileBase64
                type="file"
                multiple={false}
                value = {postData.file}
                required
                accept="image/png, image/gif, image/jpeg"
                onDone={({ base64 }) =>
                  setpostData({ ...postData, file: base64 })
                }
              />
              {postData.file ? (
                <img alt="" src={postData.file} style={{ marginTop: "20px" }} />
              ) : (
                <h4>No Image Selected</h4>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {postData.file && postData.body.length >= 25 ? (
              <Button onClick = {updatePost}>Update</Button>
            ) : (
              <div>
                <Tooltip arrow title = "NOTE: Image is mandatory and body must be greater than 25 letters">
                  <InfoOutlined style = {{position:"relative",top:"8px",cursor:"pointer"}}/>
                </Tooltip>
                <Button disabled>Update</Button>
              </div>
            )}
            <Button onClick={handleCloseOpen}>Close</Button>
          </DialogActions>
        </Dialog>
      </form>

      {/* delete post alert */}

      <Snackbar open={opendeletealert} autoHideDuration={6000} onClose={handleClosedeletealert}>
        <Alert onClose={handleClosedeletealert} severity="success" sx={{ width: '100%' }}>
          Post deleted succesfully
        </Alert>
      </Snackbar>

    </div>
  );
};

export default PostBody;
