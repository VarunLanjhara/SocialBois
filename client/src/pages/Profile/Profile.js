import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  console.log(params.name);
  useEffect(() => {
    if (user) {
      document.title = `SocialBois - ${params.name}`;
      console.log("User is there");
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);
  return (
    <div>
      <Navbar user={user} />
    </div>
  );
};

export default Profile;
