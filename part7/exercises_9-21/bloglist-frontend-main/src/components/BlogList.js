import React, { useState, useEffect } from "react";
import store from "../store";
import BlogEntry from "./BlogEntry";
import Toggleable from "./Toggleable"
import loginService from "../services/login"
import { displayNotification } from "../reducers/notificationReducer";
import { useDispatch, connect } from "react-redux";
import { addNewBlog, initializeBlogs } from "../reducers/blogReducer";
import {
  Link
} from "react-router-dom";
import { updateUserInfo } from "../reducers/userReducer";


const BlogList = (props) => {
  const _store = store.getState()
  const [newBlog, setNewBlog] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      console.log('useeffectthinghappening')
      const u = JSON.parse(loggedUserJSON);
      dispatch(updateUserInfo(u, u.token))
      dispatch(initializeBlogs())
      setLoggedIn(true)
    }
  }, [dispatch]);


  
  
  const handleTitle = (value) => {
    setTitle(value);
    setNewBlog({
      title,
      author,
      url,
    });
  };

  const handleAuthor = (value) => {
    setAuthor(value);
    setNewBlog({
      title,
      author,
      url,
    });
  };

  const handleUrl = (value) => {
    setUrl(value);
    setNewBlog({
      title,
      author,
      url,
    });
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();
    try {
      const token = store.getState().userInfo.token;
      dispatch(addNewBlog(newBlog, token));
      setTitle("");
      setAuthor("");
      setUrl("");
      dispatch(displayNotification(`Added: ${newBlog.title}`, true, 5));
    } catch (exception) {
      dispatch(displayNotification(`${exception.response.data}`, false, 5))
      console.log(exception);
    }
  };

  const loggedinName = () => _store.userInfo.user === null ? "..." : _store.userInfo.user.username

  const logOut = () => {
    loginService.logout()
    props.logInOut()
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Toggleable id="addBlogToggle" buttonLabel="Add Blog">
        <BlogEntry
          handleNewBlog={handleNewBlog}
          author={author}
          handleAuthor={handleAuthor}
          title={title}
          handleTitle={handleTitle}
          url={url}
          handleUrl={handleUrl}
      />
      </Toggleable>
    <table>
      <thead>
         <tr>
              <th colSpan="1"></th>
         </tr>
      </thead>
      <tbody>
      {[...props.blogList.blogs]
        .map((blog) => (
          <tr key={blog.id}>
            <td><Link to={`/${blog.id}`} >{blog.title}</Link> By: {blog.author}</td>  
          </tr>
      ))}
      </tbody>
    </table>
      
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    blogList: state.blogList,
  };
};

const ConnectedBlogs = connect(mapStateToProps)(BlogList);

export default ConnectedBlogs;
