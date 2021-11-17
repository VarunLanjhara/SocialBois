import React from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <CreatePost />
    </div>
  );
};

export default Home;
