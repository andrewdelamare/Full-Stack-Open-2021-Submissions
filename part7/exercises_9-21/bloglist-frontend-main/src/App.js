/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom";
import store from "./store";
import Notification from "./components/Notification";
import UserList from "./components/UserList"
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import UPage from "./components/UPage";
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
  const usersPage = () => (
    <UserList logInOut={logInOut} />
  )
  const uPage = () => (
    <UPage logInOut={logInOut} />
  )
  const loginForm = () => (
    <LoginForm logInOut={logInOut} />
  );

  const showTheRightPage = (rightPage) => {
    const currentState = isLoggedIn
    console.log(currentState)
    if(currentState === false){
      return loginForm()
    }else if(currentState === true){
      return rightPage()
    }
  }
  return (
    <Router>
      <Notification />
      <Routes>
        <Route path="/" element={showTheRightPage(blogList)} />
        <Route path="/users" element={showTheRightPage(usersPage)} />
        <Route path="/blogs" element={showTheRightPage(blogList)} />
        <Route path="/users/:id" element={showTheRightPage(uPage)} />
      </Routes>
      
    </Router>
  );
}
export default App;
