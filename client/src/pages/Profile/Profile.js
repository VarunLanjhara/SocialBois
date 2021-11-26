import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { followUser, getUserById } from "../../actions/auth";
import { getUserByName } from "../../actions/profile.js";
import { getUserPosts } from "../../actions/posts";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Skeleton } from "@mui/material";
import PostBody from "../../components/Posts/PostsBody";
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
import jwt_decode from "jwt-decode";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [loading, setloading] = useState(true);
  const [loadingprofile, setloadingprofile] = useState(true);
  const SHARE_URL = "https://socialbois.netlify.app/profile/";
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      document.title = `SocialBois - ${params.name}`;
    } else {
      navigate("/auth");
    }
  }, [user, navigate, params]);

  let decodedtoken = "";

  user ? (decodedtoken = jwt_decode(user.token)) : navigate("/auth");

  const currentuser = useSelector((user) => user.authReducer);
  useEffect(() => {
    dispatch(getUserById(decodedtoken.id));
  }, [dispatch]);

  const profile = useSelector((user) => user.profileReducer);
  useEffect(() => {
    dispatch(getUserByName(params.name));
    setTimeout(() => {
      setloadingprofile(false);
    }, [3000]);
  }, [dispatch, params, user, currentuser]);

  if (profile === []) {
    navigate("/");
  }

  const profileposts = useSelector((user) => user.posts);
  useEffect(() => {
    dispatch(getUserPosts(profile._id));
    setTimeout(() => {
      setloading(false);
    }, [1000]);
  }, [dispatch, profile]);

  const handleClickalert = () => {
    setOpenalert(true);
  };

  const handleClosealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenalert(false);
  };

  const followuser = () => {
    dispatch(followUser(profile._id, currentuser._id));
    setTimeout(() => {
      handleClickalert();
    }, [2000]);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openalert, setOpenalert] = React.useState(false);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar user={currentuser} />
      <Card
        sx={{
          maxWidth: 445,
          marginTop: "200px",
          marginLeft: "20px",
          position: "absolute",
        }}
      >
        {loadingprofile === true ? (
          <Skeleton
            variant="circular"
            width={50}
            height={50}
            style={{ position: "relative", top: "10px", left: "10px" }}
          />
        ) : (
          <Avatar
            src={profile.pfp}
            style={{
              width: "50px",
              height: "50px",
              position: "relative",
              top: "10px",
              left: "10px",
            }}
          />
        )}
        <CardContent>
          {loadingprofile === true ? (
            <Skeleton variant="text" width={120} />
          ) : (
            <Typography gutterBottom variant="h5" component="div">
              {profile.username}
            </Typography>
          )}
          {loadingprofile === true ? (
            <Skeleton variant="text" width={250} />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {profile.bio}
            </Typography>
          )}
          <div style={{ display: "flex", padding: "20px" }}>
            <div>
              {loadingprofile === true ? (
                <Skeleton variant="text" width={100} />
              ) : (
                <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                  Followers
                </p>
              )}
              {loadingprofile === true ? (
                <Skeleton variant="text" width={40} />
              ) : (
                <p
                  style={{
                    fontWeight: "bold",
                    marginLeft: "38px",
                    marginTop: "4px",
                    color: "gray",
                  }}
                >
                  {profile.followers && profile.followers.length}
                </p>
              )}
            </div>
            <div style={{ marginLeft: "170px" }}>
              {loadingprofile === true ? (
                <Skeleton variant="text" width={100} />
              ) : (
                <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                  Following
                </p>
              )}
              {loadingprofile === true ? (
                <Skeleton variant="text" width={40} />
              ) : (
                <p
                  style={{
                    fontWeight: "bold",
                    marginLeft: "38px",
                    marginTop: "4px",
                    color: "gray",
                  }}
                >
                  {profile.following && profile.following.length}
                </p>
              )}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            {loadingprofile === true ? (
              <Skeleton
                variant="text"
                width={300}
                style={{ position: "relative", left: "50px" }}
              />
            ) : currentuser._id === profile._id ? (
              <Button
                variant="contained"
                style={{ marginLeft: "100px" }}
                onClick={() => {
                  navigate("/update_profile");
                }}
              >
                Update Profile
              </Button>
            ) : (
              <div style={{ display: "flex" }}>
                <Button
                  variant="contained"
                  style={{ marginLeft: "80px", marginRight: "10px" }}
                  onClick={followuser}
                >
                  {profile.followers
                    ? profile.followers.includes(currentuser._id)
                      ? "UnFollow"
                      : "Follow"
                    : ""}
                </Button>
                <Button variant="contained" style={{ marginLeft: "20px" }}>
                  Chat
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            Share
          </Button>
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
              <WhatsappShareButton url={`${SHARE_URL + profile.username}`}>
                <WhatsappIcon />
              </WhatsappShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <FacebookShareButton url={`${SHARE_URL + profile.username}`}>
                <FacebookIcon />
              </FacebookShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <TwitterShareButton url={`${SHARE_URL + profile.username}`}>
                <TwitterIcon />
              </TwitterShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <RedditShareButton url={`${SHARE_URL + profile.username}`}>
                <RedditIcon />
              </RedditShareButton>
            </MenuItem>
          </Menu>
        </CardActions>
      </Card>
      <div
        style={{
          position: "relative",
          left: "600px",
          top: "100px",
          height: "100vh",
        }}
      >
        {profileposts
          ? profileposts.map((post, index) => (
              <PostBody post={post} user={currentuser} loading={loading} />
            ))
          : ""}
        {profileposts.length === 0 ? (
          <div
            style={{
              overflow: "hidden",
              position: "relative",
              top: "130px",
            }}
          >
            <h1 style={{ color: "white" }}>
              Seems like dis idiot has no posts 🤷‍♀️
            </h1>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* user follow snackbar */}
      <Snackbar
        open={openalert}
        autoHideDuration={6000}
        onClose={handleClosealert}
      >
        <Alert
          onClose={handleClosealert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {profile.followers && profile.followers.includes(currentuser._id)
            ? `You started following ${profile.username}`
            : `You unfollowed ${profile.username}`}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
