import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./UsersPosts.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserPosts } from "../../actions/posts";
import { useParams } from "react-router-dom";
import PostBody from "../../components/Posts/PostsBody";
import jwt_decode from "jwt-decode";
import { getUserById } from "../../actions/auth";

const UsersPosts = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (user) {
      document.title = "SocialBois - Your Stuff";
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  let decodedtoken = "";

  user ? (decodedtoken = jwt_decode(user.token)) : navigate("/auth");

  const currentuser = useSelector((user) => user.authReducer);
  useEffect(() => {
    dispatch(getUserById(decodedtoken.id));
  }, [dispatch]);

  const profileposts = useSelector((user) => user.posts);
  useEffect(() => {
    dispatch(getUserPosts(currentuser._id));
    setTimeout(() => {
      setloading(false);
    }, [1000]);
  }, [dispatch, params, currentuser]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar user={currentuser} />
      <div
        style={{
          marginTop: "100px",
          marginLeft: "230px",
          width: "620px",
        }}
      >
        {profileposts
          ? profileposts.map((post, index) => (
              <PostBody
                key={index}
                post={post}
                loading={loading}
                user={currentuser}
              />
            ))
          : ""}
        {profileposts.length === 0 ? (
          <div
            style={{
              marginLeft: "100px",
              marginTop: "280px",
              width: "100vw",
            }}
          >
            <h1 style={{ color: "white", fontSize: "30px" }}>
              You have no posts go create some posts else 🔪
            </h1>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UsersPosts;
