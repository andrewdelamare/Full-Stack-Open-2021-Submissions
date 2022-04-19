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
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import UPage from "./components/UPage";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import loginService from "./services/login";


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

  const userInfo = store.getState().userInfo
  const loggedinName = () => userInfo.user === null ? "..." : userInfo.user.username;
  const logInOut = () => setLoggedIn(!isLoggedIn)

  const logOut = () => {
    loginService.logout()
    logInOut()
  }

  const blogList = () => {
    return (
    <BlogList logInOut={logInOut} />
  )}
  const blogPage = () => (
    <Blog logInOut={logInOut} />
  )
  const usersPage = () => (
    <UserList logInOut={logInOut} />
  )
  const uPage = () => {
    return (<UPage logInOut={logInOut} />)}
    
  const loginForm = () => (
    <LoginForm logInOut={logInOut} />
  );

  const padding = {
    padding: 10
  }

  const showTheRightPage = (rightPage) => {
    const currentState = isLoggedIn
    console.log(currentState)
    if(currentState === false){
      return loginForm()
    }else if(currentState === true){
      return (
      <div>
        <Link style={padding} to="/">Blogs</Link>
        <Link  style={padding} to="/users">Users</Link>
        {`            Logged in as ${loggedinName()}               `}
        <button onClick={logOut} type="button" stype={padding}>Logout</button>
        {rightPage()}
      </div>)
    }
  }
  return (
    <Router>
      <Notification />
      <Routes>
        <Route path="/" element={showTheRightPage(blogList)} />
        <Route path="/users" element={showTheRightPage(usersPage)} />
        <Route path="/blogs" element={showTheRightPage(blogList)} />
        <Route path="/:id" element={showTheRightPage(blogPage)} />
        <Route path="/users/:id" element={showTheRightPage(uPage)} />
      </Routes>
      
    </Router>
  );
}
export default App;
