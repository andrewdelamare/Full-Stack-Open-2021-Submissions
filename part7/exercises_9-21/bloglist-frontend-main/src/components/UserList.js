import React, {useState, useEffect} from "react";
import {useDispatch, connect} from 'react-redux';
import loginService from "../services/login";
import {getAll} from "../services/users";
import {addAllUsers} from "../reducers/userReducer";
import {
  Link
} from "react-router-dom";
import { Table, Form, Button } from 'react-bootstrap'

const UserList = (props) => {
  const userInfo = props.userInfo
  const dispatch = useDispatch();
  const [allusers, setAllusers] = useState([])
  useEffect(() => {
    getAll()
      .then(response => {
        setAllusers(response)
        dispatch(addAllUsers(response))
      })

  }, []);

  const loggedinName = () => userInfo.user === null ? "..." : userInfo.user.username

  const logOut = () => {
    loginService.logout()
    props.logInOut()
  }
  const UserTableRow = ({user}) => {
    return (
      <tr>
        <td>
          <Link to={`/users/${user.id}`} >{user.name}</Link>
        </td>
        <td></td>
        <td>
          {user.username}
        </td>
        <td></td>
        <td>
          {user.blogs.length}
        </td>
      </tr>
    )
  }
  return (
  <div>
    <h3>
    Users
    </h3>
    <Table>
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
    </Table>
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
