import React, { useState, useEffect } from "react";
import Posts from "../../components/Posts/Posts";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("User is there");
      document.title = "SocialBois";
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar user={user} />
      <Posts />
    </div>
  );
};

export default Home;
