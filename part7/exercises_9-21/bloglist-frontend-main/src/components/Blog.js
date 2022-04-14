import React, { useState, useEffect } from "react";
import { connect, useDispatch} from 'react-redux';
import store from "../store";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { displayNotification } from "../reducers/notificationReducer";
import { deleteIt, likeIt } from "../reducers/blogReducer";
import {
  useParams
} from "react-router-dom";
import { updateUserInfo } from "../reducers/userReducer";
import { initializeBlogs } from "../reducers/blogReducer";

const Blog = (props) => {
  const dispatch = useDispatch();
  const userInfo = store.getState().userInfo
  const [likes, setLikes] = useState(null);
  const [blog, setBlog] = useState({
      title: "_",
      author: "",
      url: "",
      likes: 0,
      user: {
        username: "",
        name: "",
        id: ""
      },
      id: ""
    })
  const id = useParams().id;
  const loggedinName = () => userInfo.user === null ? "..." : userInfo.user.username;
  //let blog = blogsList.blogs.find(b => b.id === id)
  if(blog.title === "_"){
    dispatch(initializeBlogs())
    const blogsList = props.blogList;
    console.log(blog)
    const blogee = blogsList.blogs.find(b => b.id === id)
    console.log(blogee)
    setBlog(blogee)
  }

  const removeBlog = async (idOfBlog) => {
    try {
      console.log(idOfBlog);
      await blogService.deleteIt(idOfBlog, userInfo.token);
      dispatch(deleteIt(idOfBlog))
      dispatch(displayNotification("Blog Deleted Successfully", true, 5))
    } catch (exception) {
      dispatch(displayNotification("failed to delete blog", false, 5))
      console.log(exception);
    }
  };

  const deleteBlog = async () => {
    const message = "Do you really want to delete this blog?";
    if (window.confirm(message)) {
      removeBlog(blog.id);
    }
  };

  const addALike = (blog) => {
    dispatch(likeIt(blog, userInfo.token));
  }
  const addLike = (blog) => {
    const blogCopy = {...blog};
    blogCopy.likes ++;
    setLikes(likes + 1);
    console.log(blogCopy)
    addALike(blogCopy);
  };

  const logOut = () => {
    loginService.logout()
    props.logInOut()
  }

  const DisplayBlog = () => (
  <div>
    <h2>{`Logged in as ${loggedinName()}`}</h2>
    <button onClick={logOut} type="button">
        Logout
    </button>
    <h3>{blog.title}</h3>
    <h4>{blog.author}</h4>
    <div className="likes">
          Likes: {blog.likes}{" "}
          <button type="button" onClick={addLike} id="likeButton">
            Like
          </button>
    </div>
    <div className="url">URL: {blog.url}</div>
        <button onClick={deleteBlog} type="button" id="deleteBlogButton">
          Delete Blog
        </button>
  </div>
  );

  return (
    <div>
      {blog === undefined ? dispatch(initializeBlogs()) : <DisplayBlog />}
    </div>
  )
};



const mapStateToProps = (state) => {
  return {
    blogList: state.blogList,
  };
};

const ConnectedBlog = connect(mapStateToProps)(Blog);

export default ConnectedBlog;
