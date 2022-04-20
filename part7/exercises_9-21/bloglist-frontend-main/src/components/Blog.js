import React, { useState } from "react";
import { connect, useDispatch} from 'react-redux';
import store from "../store";
import blogService from "../services/blogs";
import { displayNotification } from "../reducers/notificationReducer";
import { deleteIt, likeIt, commentIt } from "../reducers/blogReducer";
import {
  useParams
} from "react-router-dom";
import { initializeBlogs } from "../reducers/blogReducer";
import CommentEntry from "./CommentEntry";
import { Table, Form, Button } from 'react-bootstrap'

const Blog = (props) => {
  const dispatch = useDispatch();
  const userInfo = store.getState().userInfo
  const [likes, setLikes] = useState([]);
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
    const [comment, setComment] = useState('');
    const id = useParams().id;
  if(blog.title === "_"){
    dispatch(initializeBlogs())
    const blogsList = props.blogList;
    console.log(blog)
    const blogee = blogsList.blogs.find(b => b.id === id)
    console.log(blogee)
    setBlog(blogee)
    setLikes(blogee.likes)
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

  const handleComment = (value) => {
    setComment(value);
  };

  const addALike = (blog) => {
    dispatch(likeIt(blog, userInfo.token));
  }
  const addLike = () => {
    const blogCopy = {...blog};
    blogCopy.likes ++;
    addALike(blogCopy)
    setLikes(likes + 1);
    setBlog(blogCopy)
  };

  const DisplayComments = () => {
    return blog.comments.map(comments => <p>{`${comments}`}</p>)
  }

  const handleNewComment = (event) => {
    event.preventDefault();
    let blogCopy = {...blog};
    console.log(blogCopy.comments)
    console.log(comment)
    const comments = [...blogCopy.comments , comment]
    console.log(comments)
    blogCopy.comments = comments
    console.log(blogCopy)
    setComment('');
    setBlog(blogCopy)
    dispatch(commentIt(blogCopy));
  }

  const displayBlog = () => (
  <div>
    <h3>{blog.title}</h3>
    <h4>{blog.author}</h4>
    <div className="likes">
          Likes: {likes}{" "}
          <Button type="button" onClick={addLike} id="likeButton">
            Like
          </Button>
    </div>
    <div className="url">URL: {blog.url}</div>
        <Button onClick={deleteBlog} type="button" id="deleteBlogButton">
          Delete Blog
        </Button>
    <p>comments:</p>
    <DisplayComments />
    <CommentEntry handleNewComment={handleNewComment} comment={comment} handleComment={handleComment} /> 
  </div>
  );

  return (
    <div>
      {blog === undefined ? dispatch(initializeBlogs()) : displayBlog()}
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
