/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from "react";
import store from "./store";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      console.log('useeffectthinghappening')
      const u = JSON.parse(loggedUserJSON);
      dispatch(updateUserInfo(u, u.token))
      dispatch(initializeBlogs())
      setLoggedIn(true)
    }
  }, [dispatch]);
  const logInOut = () => setLoggedIn(!isLoggedIn)
  const blogList = () => (
    <BlogList logInOut={logInOut} />
  )
  const loginForm = () => (
    <LoginForm logInOut={logInOut} />
  );

  const showTheRightPage = () => {
    //store.getState() === false ? loginForm() : blogList()
    const currentState = isLoggedIn
    console.log(currentState)
    if(currentState === false){
      return loginForm()
    }else if(currentState === true){
      return blogList()
    }
  }
  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      {showTheRightPage()}
    </div>
  );
}

export default App;
