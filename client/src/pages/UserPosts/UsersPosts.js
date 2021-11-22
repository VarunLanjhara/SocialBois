import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./UsersPosts.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserPosts } from "../../actions/posts";
import { useParams } from "react-router-dom";
import PostBody from "../../components/Posts/PostsBody";

const UsersPosts = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (user) {
      document.title = "SocialBois - Your Stuff";
      console.log("User is there");
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  const profileposts = useSelector((user) => user.posts);
  useEffect(() => {
    dispatch(getUserPosts(user.result._id));
    setTimeout(() => {
      setloading(false);
    }, [1000]);
  }, [dispatch, params, user]);

  console.log(profileposts);

  return (
    <div>
      <Navbar user={user} />
      <div
        style={{
          marginTop: "100px",
          marginLeft: "230px",
          width: "620px",
        }}
      >
        {profileposts
          ? profileposts.map((post, index) => (
              <PostBody key={index} post={post} loading={loading} user={user} />
            ))
          : ""}
      </div>
    </div>
  );
};

export default UsersPosts;
