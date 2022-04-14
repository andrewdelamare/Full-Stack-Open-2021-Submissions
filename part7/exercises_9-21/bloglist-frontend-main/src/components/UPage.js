import React from "react";
import { connect} from 'react-redux';
import loginService from "../services/login";
import {
  useParams
} from "react-router-dom";

const UPage = (props) => {
  const userInfo = props.userInfo;
  const id = useParams().id;
  const loggedinName = () => userInfo.user === null ? "..." : userInfo.user.username;
  const user = userInfo.users.find(u => u.id === id)
  console.log(user)
  const logOut = () => {
    loginService.logout()
    props.logInOut()
  }
  return (
  <div>
    <h2>{`Logged in as ${loggedinName()}`}</h2>
    <button onClick={logOut} type="button">
        Logout
    </button>
    <h3>{user.name}</h3>
    <h4>Added Blogs</h4>
    <ul>
      {user.blogs.map(
        (b) => (<li>{b.title}</li>) 
      )}
    </ul>
  </div>
  )
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

const ConnectedUser = connect(mapStateToProps)(UPage);

export default ConnectedUser;
