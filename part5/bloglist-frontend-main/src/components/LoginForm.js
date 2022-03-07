import React from 'react';
import PropTypes from 'prop-types';

const loginForm = ({
  username, setUsername, password, setPassword, handleLogin,
}) => (
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

loginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default loginForm;
