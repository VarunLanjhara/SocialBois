import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./PostsBody.css"
import { CardActionArea } from "@mui/material";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CommentIcon from '@mui/icons-material/Comment';

const PostBody = () => {
  return (
    <div>
      <Card sx={{ maxWidth: 620 }} className="PostBody">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Sur"
          subheader="4 hours ago"
        />
        <CardActionArea>
          <CardMedia
            component="img"
            height="194"
            image="https://mui.com/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi, rem! Modi, aperiam! Nulla pariatur maxime ut magnam,
              dolorum iure sapiente aliquid ullam alias reiciendis doloribus
              obcaecati dolore veniam molestias sint.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing = {false}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
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