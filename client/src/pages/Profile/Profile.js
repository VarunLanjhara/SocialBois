import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { followUser, getUserByName } from "../../actions/auth";
import { getUserPosts } from "../../actions/posts";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
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

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [loading, setloading] = useState(true);
  const SHARE_URL = "http://localhost:3000/profile/";
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      document.title = `SocialBois - ${params.name}`;
      console.log("User is there");
    } else {
      navigate("/auth");
    }
  }, [user, navigate, params]);

  const profile = useSelector((user) => user.authReducer);
  useEffect(() => {
    dispatch(getUserByName(params.name));
  }, [dispatch, params]);

  const profileposts = useSelector((user) => user.posts);
  useEffect(() => {
    dispatch(getUserPosts(profile._id));
    setTimeout(() => {
      setloading(false);
    }, [1000]);
  }, [dispatch, params, profile]);

  console.log(profileposts);

  const followuser = () => {
    dispatch(followUser(profile._id, user.result._id));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar user={user} />
      <Card
        sx={{
          maxWidth: 445,
          marginTop: "200px",
          marginLeft: "20px",
          position: "absolute",
        }}
      >
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {profile.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.bio}
          </Typography>
          <div style={{ display: "flex", padding: "20px" }}>
            <div>
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>Followers</p>
              <p
                style={{
                  fontWeight: "bold",
                  marginLeft: "38px",
                  marginTop: "4px",
                  color: "gray",
                }}
              >
                {profile.followers ? profile.followers.length : 0}
              </p>
            </div>
            <div style={{ marginLeft: "170px" }}>
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>Following</p>
              <p
                style={{
                  fontWeight: "bold",
                  marginLeft: "38px",
                  marginTop: "4px",
                  color: "gray",
                }}
              >
                {profile.following ? profile.following.length : 0}
              </p>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            {user.result._id === profile._id ? (
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
                  style={{ marginLeft: "100px" }}
                  onClick={followuser}
                >
                  {profile.followers
                    ? profile.followers.includes(user.result._id)
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
              <WhatsappShareButton url={`${SHARE_URL + profile._id}`}>
                <WhatsappIcon />
              </WhatsappShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <FacebookShareButton url={`${SHARE_URL + profile._id}`}>
                <FacebookIcon />
              </FacebookShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <TwitterShareButton url={`${SHARE_URL + profile._id}`}>
                <TwitterIcon />
              </TwitterShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <RedditShareButton url={`${SHARE_URL + profile._id}`}>
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
        {profileposts.map((post, index) => (
          <PostBody post={post} user={user} loading={loading} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
