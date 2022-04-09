/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogEntry from "./components/BlogEntry";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import { displayNotification } from "./reducers/notificationReducer";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitle = async (value) => {
    await setTitle(value);
    setNewBlog({
      title,
      author,
      url,
    });
  };

  const handleAuthor = async (value) => {
    await setAuthor(value);
    setNewBlog({
      title,
      author,
      url,
    });
  };

  const handleUrl = async (value) => {
    await setUrl(value);
    setNewBlog({
      title,
      author,
      url,
    });
  };

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
      displayNotification("Incorrect username or password", false, 5);
      console.log(exception);
    }
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.addBlog(newBlog, token);
      const newList = blogs.concat(response);
      displayNotification("Your blog was added!", 5);
      setBlogs(newList);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      displayNotification(`${exception.response.data}`, false, 5);
      console.log(exception);
    }
  };

  const removeBlog = async (idOfBlog) => {
    try {
      console.log(idOfBlog);
      await blogService.deleteIt(idOfBlog, token);
      const bl = await blogService.getAll();
      setBlogs(bl);
      displayNotification("Blog Deleted Successfully", true, 5);
    } catch (exception) {
      displayNotification("failed to delete blog", false, 5);
      console.log(exception);
    }
  };

  const resetUser = () => {
    loginService.logout();
    const nul = null;
    setUser(nul);
  };
  const blogList = () => (
    <div>
      <h2>{`Logged in as ${user.username}`}</h2>
      <button onClick={resetUser} type="button">
        Logout
      </button>
      <Toggleable id="addBlogToggle" buttonLabel="Add Blog">
        <BlogEntry
          handleNewBlog={handleNewBlog}
          title={title}
          handleTitle={handleTitle}
          author={author}
          handleAuthor={handleAuthor}
          url={url}
          handleUrl={handleUrl}
        />
      </Toggleable>
      <div className="blogs">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              removeBlog={removeBlog}
              updateBlog={blogService.updateBlog}
            />
          ))}
      </div>
    </div>
  );
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
