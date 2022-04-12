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

  const blogList = () => (
    <BlogList />
  )
  const loginForm = () => (
    <LoginForm />
  );
  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      {isLoggedIn === "false" ? loginForm() : blogList()}
    </div>
  );
}

export default App;
