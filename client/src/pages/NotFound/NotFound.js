import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../actions/auth";

const NotFound = () => {
  const navigate = useNavigate();
  const goback = () => {
    navigate("/");
  };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    if (user) {
      document.title = "Nothing Found";
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  const dispatch = useDispatch();

  const decodedtoken = jwt_decode(user.token);
  const currentuser = useSelector((user) => user.authReducer);
  useEffect(() => {
    dispatch(getUserById(decodedtoken.id));
  }, [dispatch]);

  return (
    <div class="containerr">
      <Navbar user={currentuser} />
      <div>
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
