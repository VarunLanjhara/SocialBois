import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchResult.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchQuery } from "../../actions/posts";
import PostBody from "../../components/Posts/PostsBody";

const SearchResult = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const params = useParams();
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      document.title = "SocialBois - Search Results";
      console.log("User is there");
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
  return (
    <div>
      <Navbar user={user} />
      {searchposts.map((post, index) => (
        <div
          style={{
            marginLeft: "230px",
            marginTop: "100px",
            width: "620px",
          }}
        >
          <PostBody user={user} loading={loading} post={post} />
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
