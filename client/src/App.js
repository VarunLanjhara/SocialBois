import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path = "/auth" element = {<Login />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
