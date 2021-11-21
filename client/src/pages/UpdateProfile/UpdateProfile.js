import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { updateProfile } from "../../actions/auth";
import { useDispatch } from "react-redux";

const UpdateProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const [updateProfileData, setupdateProfileData] = useState({
    username: user.result.username,
    email: user.result.email,
    bio: user.result.bio,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      document.title = "SocialBois - Update Profile";
      console.log("User is there");
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  const updateprofile = () => {
    dispatch(updateProfile(user.result._id, updateProfileData));
    navigate(`/profile/${user.result.username}`);
  };

  return (
    <div>
      <Navbar user={user} />
      <div class="card">
        <h2>Update Profile</h2>
        <div class="inputs">
          <label style={{ color: "black" }}>Username</label>
          <input
            type="text"
            onChange={(e) =>
              setupdateProfileData({
                ...updateProfileData,
                username: e.target.value,
              })
            }
            value={updateProfileData.username}
          />
        </div>
        <div class="inputs">
          <label style={{ color: "black" }}>Email</label>
          <input
            type="email"
            onChange={(e) =>
              setupdateProfileData({
                ...updateProfileData,
                email: e.target.value,
              })
            }
            value={updateProfileData.email}
          />
        </div>
        <div class="inputs">
          <label style={{ color: "black" }}>Bio</label>
          <textarea
            type="text"
            rows={10}
            onChange={(e) =>
              setupdateProfileData({
                ...updateProfileData,
                bio: e.target.value,
              })
            }
            value={updateProfileData.bio}
          />
        </div>
        <button class="btn-login" onClick={updateprofile}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
