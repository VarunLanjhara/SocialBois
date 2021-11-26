import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchResult.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchQuery } from "../../actions/posts";
import PostBody from "../../components/Posts/PostsBody";
import jwt_decode from "jwt-decode";
import { getUserById } from "../../actions/auth";

const SearchResult = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const params = useParams();
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      document.title = "SocialBois - Search Results";
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);
  const dispatch = useDispatch();
  const searchposts = useSelector((posts) => posts.posts);
  useEffect(() => {
    dispatch(searchQuery(params.name));
    setTimeout(() => {
      setloading(false);
    }, [1000]);
  }, [dispatch, params]);
  let decodedtoken = "";

  user ? (decodedtoken = jwt_decode(user.token)) : navigate("/auth");

  const currentuser = useSelector((user) => user.authReducer);
  useEffect(() => {
    dispatch(getUserById(decodedtoken.id));
  }, [dispatch]);
  return (
    <div>
      <Navbar user={currentuser} />
      {searchposts.map((post, index) => (
        <div
          style={{
            marginLeft: "230px",
            marginTop: "100px",
            width: "620px",
          }}
          key={index}
        >
          <PostBody user={currentuser} loading={loading} post={post} />
        </div>
      ))}
      {searchposts.length === 0 ? (
        <div
          style={{
            marginLeft: "430px",
            marginTop: "280px",
          }}
        >
          <h1 style={{ color: "white", fontSize: "37px" }}>
            No Seacrh Result Found 🤷‍♀️
          </h1>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchResult;
