import React, { useState, useEffect } from "react";
import Posts from "../../components/Posts/Posts";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../actions/auth";

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      document.title = "SocialBois";
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

  return (
    <div className="home">
      <Navbar user={currentuser} />
      <Posts user={currentuser} />
    </div>
  );
};

export default Home;
