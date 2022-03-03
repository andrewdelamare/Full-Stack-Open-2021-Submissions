/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
/*
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const u = JSON.parse(loggedUserJSON);
      setUser(u);
      blogService.setToken(user.token);
    }
  }, []);
*/
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const u = await loginService.login({
        username, password,
      });
      setUser(u);
      setUsername(username);
      setPassword(password);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(u));
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

  const blogForm = () => (
    <form onSubmit={blogService.addBlog}>
      <input />
      <button type="submit">save</button>
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
      <button onClick={resetUser}>Logout</button>
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
