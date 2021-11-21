import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const UpdateProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      document.title = "SocialBois - Update Profile";
      console.log("User is there");
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar user={user} />
      <div class="card">
        <h2>Update Profile</h2>
        <div class="inputs">
          <label style={{ color: "black" }}>Username</label>
          <input type="text" />
        </div>
        <div class="inputs">
          <label style={{ color: "black" }}>Email</label>
          <input type="email" />
        </div>
        <div class="inputs">
          <label style={{ color: "black" }}>Bio</label>
          <textarea type="text" rows={10} />
        </div>
        <button class="btn-login">Update</button>
      </div>
    </div>
  );
};

export default UpdateProfile;
