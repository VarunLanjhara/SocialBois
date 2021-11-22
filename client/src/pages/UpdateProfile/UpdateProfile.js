import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
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
      <div style={{ marginTop: "100px", marginLeft: "400px" }}>
        <h1 style={{ color: "white", fontSize: "35px", marginLeft: "150px" }}>
          Update Profile
        </h1>
        <div style={{ display: "inline-block" }}>
          <input
            type="text"
            placeholder="Username"
            style={{
              width: "400px",
              height: "50px",
              borderRadius: "100px",
              border: "transparent",
              outline: "none",
              paddingLeft: "10px",
              marginLeft: "100px",
              marginTop: "40px",
            }}
            onChange={(e) =>
              setupdateProfileData({
                ...updateProfileData,
                username: e.target.value,
              })
            }
            value={updateProfileData.username}
          />
          <input
            type="email"
            placeholder="Email"
            style={{
              width: "400px",
              height: "50px",
              borderRadius: "100px",
              border: "transparent",
              outline: "none",
              paddingLeft: "10px",
              marginLeft: "100px",
              marginTop: "40px",
            }}
            onChange={(e) =>
              setupdateProfileData({
                ...updateProfileData,
                email: e.target.value,
              })
            }
            value={updateProfileData.email}
          />
          <textarea
            placeholder="Bio"
            rows={5}
            style={{
              width: "400px",
              borderRadius: "100px",
              border: "transparent",
              outline: "none",
              paddingLeft: "10px",
              marginLeft: "100px",
              marginTop: "40px",
              padding: "20px",
              resize: "none",
            }}
            onChange={(e) =>
              setupdateProfileData({
                ...updateProfileData,
                bio: e.target.value,
              })
            }
            value={updateProfileData.bio}
          />
        </div>
        <Button
          variant="contained"
          style={{
            marginLeft: "200px",
            marginTop: "30px",
          }}
          onClick={updateprofile}
        >
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfile;
