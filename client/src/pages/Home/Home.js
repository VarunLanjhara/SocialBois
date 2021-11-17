import React from "react";
import Posts from "../../components/Posts/Posts";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css"

const Home = () => {
  return (
    <div>
      <Navbar />
      <Posts />
    </div>
  );
};

export default Home;
