/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogEntry from './components/BlogEntry';
import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [url, setUrl] = useState(null);
  const [token, setToken] = useState(null);

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
      setErrorMessage('Wrong credentials');
      console.log(exception);
      setTimeout(() => {
        setErrorMessage(null);
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
  const handleNewBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      const response = await blogService.addBlog(newBlog, token);
      const newList = blogs.concat(response);
      setBlogs(newList);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      console.log(exception);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
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
      <BlogEntry
        addBlog={handleNewBlog}
        author={author}
        setAuthor={setAuthor}
        title={title}
        setTitle={setTitle}
        url={url}
        setUrl={setUrl}
      />
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );

  return (
    <div>
      <h2>Blogs</h2>
      {user === null
        ? loginForm()
        : blogList()}

    </div>
  );
}

export default App;
