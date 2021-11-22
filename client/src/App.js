import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Preloader from "./components/Preloader/Preloader";

function App() {
  const Home = lazy(() => import("./pages/Home/Home"));
  const Login = lazy(() => import("./pages/Login/Login"));
  const Trending = lazy(() => import("./pages/Trending/Trending"));
  const SinglePost = lazy(() => import("./pages/SinglePost/SinglePost"));
  const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
  const Profile = lazy(() => import("./pages/Profile/Profile"));
  const UpdateProfile = lazy(() =>
    import("./pages/UpdateProfile/UpdateProfile")
  );
  const UsersPosts = lazy(() => import("./pages/UserPosts/UsersPosts"));
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/post/:postid" element={<SinglePost />} />
            <Route path="/profile/:name" element={<Profile />} />
            <Route path="/update_profile" element={<UpdateProfile />} />
            <Route path="your_stuff" element={<UsersPosts />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
