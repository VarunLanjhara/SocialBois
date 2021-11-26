import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, TextField } from "@mui/material";
import { getUserById, updateProfile } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import FileBase64 from "react-file-base64";

const UpdateProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let decodedtoken = "";

  user ? (decodedtoken = jwt_decode(user.token)) : navigate("/auth");

  const currentuser = useSelector((user) => user.authReducer);
  useEffect(() => {
    dispatch(getUserById(decodedtoken.id));
  }, [dispatch]);
  const [updateProfileData, setupdateProfileData] = useState({
    username: currentuser.username,
    email: currentuser.email,
    bio: currentuser.bio,
    pfp: currentuser.pfp,
  });

  useEffect(() => {
    if (user) {
      document.title = "SocialBois - Update Profile";
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  const updateprofile = () => {
    dispatch(updateProfile(currentuser._id, updateProfileData));
    navigate(`/profile/${updateProfileData.username}`);
  };

  return (
    <div>
      <Navbar user={currentuser} />
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
          <Avatar
            src={updateProfileData.pfp}
            alt=""
            style={{
              width: "70px",
              height: "70px",
              marginLeft: "240px",
              marginTop: "20px",
            }}
          ></Avatar>
          <div style={{ marginLeft: "240px", marginTop: "20px" }}>
            <FileBase64
              style={{ marginLeft: "240px", marginTop: "20px" }}
              type="file"
              multiple={false}
              required
              accept="image/png, image/gif, image/jpeg"
              onDone={({ base64 }) =>
                setupdateProfileData({ ...updateProfileData, pfp: base64 })
              }
            />
          </div>
        </div>
        <Button
          variant="contained"
          style={{
            marginLeft: "200px",
            marginTop: "30px",
            marginBottom: "30px",
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
