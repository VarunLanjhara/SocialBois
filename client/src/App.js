import React,{useEffect} from 'react'
import './App.css';
import { useDispatch,useSelector } from 'react-redux';
import Home from './pages/Home/Home';
import {getPosts} from "./actions/posts.js"

function App() {

  const dispatch = useDispatch()
  useSelector((posts) => console.log(posts.posts))

  useEffect(() => {
    dispatch(getPosts())
  },[dispatch])

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
