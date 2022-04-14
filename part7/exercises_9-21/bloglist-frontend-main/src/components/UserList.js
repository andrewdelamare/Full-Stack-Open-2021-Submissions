import React, {useState, useEffect} from "react";
import store from "../store";
import {useDispatch, connect} from 'react-redux';
import loginService from "../services/login";
import {getAll} from "../services/users";

const UserList = (props) => {
  const dispatch = useDispatch();
  const [allusers, setAllusers] = useState([])
  useEffect(() => {
    getAll().then(response => setAllusers(response))

  }, []);
  
  const _store = store.getState();
  const loggedinName = () => _store.userInfo.user === null ? "..." : _store.userInfo.user.username

  const logOut = () => {
    loginService.logout()
    props.logInOut()
  }
  const UserTableRow = ({user}) => {
    
    return (
      <tr>
        <td>
          {user.name}
        </td>
        <td>- -</td>
        <td>
          {user.username}
        </td>
        <td> - - </td>
        <td>
          {user.blogs.length}
        </td>
      </tr>
    )
  }
  return (
  <div>
    <h2>{`Logged in as ${loggedinName()}`}</h2>
    <button onClick={logOut} type="button">
        Logout
    </button>
    <h3>
    Users
    </h3>
    <table>
      <thead>
         <tr>
              <th colSpan="5"></th>
         </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <b>Name</b>
          </td>
          <td></td>
          <td>
            <b>Username</b>
          </td>
          <td></td>
          <td>
            <b>Blogs</b>
          </td>
        </tr>
      {allusers
          .map((u) => (
            <UserTableRow key={u.id} user={u}/>
        ))}
      </tbody>
    </table>
  </div>
  )
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

const ConnectedUsers = connect(mapStateToProps)(UserList);

export default ConnectedUsers;
