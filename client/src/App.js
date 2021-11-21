import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Trending from "./pages/Trending/Trending";
import SinglePost from "./pages/SinglePost/SinglePost";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/post/:postid" element={<SinglePost />} />
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/update_profile" element={<UpdateProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
