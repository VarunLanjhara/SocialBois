import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Trending from "./pages/Trending/Trending";
import SinglePost from "./pages/SinglePost/SinglePost";
import NotFound from "./pages/NotFound/NotFound";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
