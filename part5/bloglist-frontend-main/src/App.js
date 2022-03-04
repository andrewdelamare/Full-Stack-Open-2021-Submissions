/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogEntry from './components/BlogEntry';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState({ msg: null, type: null });

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
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
        username, password,
      });
      setUser(u);
      setUsername(username);
      setPassword(password);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(u));
      const bl = await blogService.getAll();
      setBlogs(bl);
    } catch (exception) {
      setNotification({ msg: 'Incorrect username or password', type: false });
      console.log(exception);
      setTimeout(() => {
        setNotification({ msg: null, type: null });
      }, 5000);
    }
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.addBlog(newBlog, token);
      const newList = blogs.concat(response);
      setNotification({ msg: 'Your blog was added!', type: true });
      setBlogs(newList);
    } catch (exception) {
      setNotification({ msg: `${exception.response.data}`, type: false });
      console.log(exception);
      setTimeout(() => {
        setNotification({ msg: null, type: null });
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username "
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password "
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const resetUser = () => {
    loginService.logout();
    const nul = null;
    setUser(nul);
  };
  const blogList = () => (
    <div>
      <h2>
        {`Logged in as ${user.username}`}
      </h2>
      <button onClick={resetUser} type="button">Logout</button>
      <Toggleable buttonLabel="Add Blog">
        <BlogEntry handleNewBlog={handleNewBlog} setNewBlog={setNewBlog} />
      </Toggleable>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );

  return (
    <div>
      <Notification message={notification.msg} type={notification.type} />
      <h2>Blogs</h2>
      {user === null
        ? loginForm()
        : blogList()}

    </div>
  );
}

export default App;
