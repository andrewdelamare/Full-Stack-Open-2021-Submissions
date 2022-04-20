import React, {useState} from "react";
import {connect, useDispatch} from 'react-redux';
import PropTypes from "prop-types";
import loginService from "../services/login";
import { initializeBlogs } from "../reducers/blogReducer";
import { updateUserInfo } from "../reducers/userReducer";
import { displayNotification } from "../reducers/notificationReducer";
import login from "../services/login";
import { Table, Form, Button } from 'react-bootstrap'

const LoginForm = ({ logInOut }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

 
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
      dispatch(updateUserInfo(u, token))
      dispatch(initializeBlogs())
      logInOut()
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
  <div className="container">
  <Form onSubmit={handleLogin}>
    <div>
      Username:
      <input
        type="text"
        value={username}
        id="username"
        onChange={({ target }) => (setUsername(target.value))}
      />
    </div>
    <div>
      Password:
      <input
        type="password"
        value={password}
        id="password"
        onChange={({ target }) => (setPassword(target.value))}
      />
    </div>
    <Button type="submit" id="login">
      login
    </Button>
  </Form>
  </div>
  )
};
/*
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
*/
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

const ConnectedLoginForm = connect(mapStateToProps)(LoginForm);

export default ConnectedLoginForm;