import React from "react";
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
import { CardActionArea, Tooltip } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CommentIcon from "@mui/icons-material/Comment";
import { format } from "timeago.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  FacebookShareButton,
  PinterestShareButton,
  RedditShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  RedditIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const PostBody = ({ post }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const SHARE_URL = "http://localhost:3000/post/";

  return (
    <div>
      <Card sx={{ maxWidth: 620 }} className="PostBody">
        <CardHeader
          avatar={
            <Tooltip arrow title = {post.author}>
              <Avatar
                sx={{ bgcolor: red[500], cursor: "pointer" }}
                aria-label="recipe"
              >
                {post.author.charAt(0)}
              </Avatar>
            </Tooltip>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.author}
          subheader={format(post.createdAt)}
        />
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
        <CardActions disableSpacing={false}>
          <IconButton aria-label="add to favorites">
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
    </div>
  );
};

export default PostBody;
