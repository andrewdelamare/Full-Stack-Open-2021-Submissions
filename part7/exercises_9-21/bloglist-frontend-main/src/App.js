/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from "react";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import { displayNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";


function App() {
 const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
 
  const dispatch = useDispatch();

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const u = JSON.parse(loggedUserJSON);
      setUser(u);
      setToken(u.token);
      const bl = await blogService.getAll();
      setBlogs(bl);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const u = await loginService.login({
        username,
        password,
      });
      setUser(u);
      setUsername(username);
      setPassword(password);
      setToken(u.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(u));
      const bl = await blogService.getAll();
      setBlogs(bl);
    } catch (exception) {
      dispatch(displayNotification("Incorrect username or password", false, 5))
      console.log(exception);
    }
  };
  
  const resetUser = () => {
    loginService.logout();
    const nul = null;
    setUser(nul);
  };

  const blogList = () => (
    <BlogList 
      user={user}
      resetUser={resetUser}
      token={token}
      blogs={blogs}
      setBlogs={setBlogs}
    />
  )
  const loginForm = () => (
    <LoginForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      {user === null ? loginForm() : blogList()}
    </div>
  );
}

export default App;
