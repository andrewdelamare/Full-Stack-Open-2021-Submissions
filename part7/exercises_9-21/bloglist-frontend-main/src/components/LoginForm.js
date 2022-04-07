import React from "react";
import PropTypes from "prop-types";

const loginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => (
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
);

loginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default loginForm;
