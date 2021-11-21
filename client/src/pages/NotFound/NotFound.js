import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const goback = () => {
    navigate("/");
  };
  return (
    <div>
      <Navbar />
      <div class="containerr">
        <h1>:(</h1>
        <br />
        <h2>
          A <span>404</span> error occured, Page not found, check the URL and
          try again.
        </h2>
        <br />
        <h3>
          <a onClick={goback}>Return to home</a>
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
