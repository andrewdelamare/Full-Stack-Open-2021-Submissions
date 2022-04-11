import React, { useState } from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import loginService from "../services/login";

const LoginForm = (props) => {
  const username = props.user.username
  const password = props.user.password
  const user = props.user.user
  const token = props.user.token
  /*
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  */ 
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
  return (
  <form onSubmit={handleLogin}>
    <div>
      Username:
      <input
        type="text"
        value={username}
        id="username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      Password:
      <input
        type="password"
        value={password}
        id="password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit" id="login">
      login
    </button>
  </form>
  )
};

loginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const ConnectedLoginForm = connect(mapStateToProps)(LoginForm);

export default ConnectedLoginForm;