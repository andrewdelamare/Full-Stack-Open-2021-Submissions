import React, { useState } from "react";
import store from "../store";
import BlogEntry from "./BlogEntry";
import Blog from "./Blog";
import Toggleable from "./Toggleable"
import loginService from "../services/login"
import { displayNotification } from "../reducers/notificationReducer";
import { useDispatch, connect } from "react-redux";
import blogService from "../services/blogs";
import { addNewBlog, deleteIt } from "../reducers/blogReducer";

const BlogList = (props) => {
  const _store = store.getState()
  const [newBlog, setNewBlog] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  //const blogss = blogs.sort((a, b) => b.likes - a.likes)
  //console.log(blogss)

  const dispatch = useDispatch();

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

  const removeBlog = async (idOfBlog) => {
    try {
      console.log(idOfBlog);
      await blogService.deleteIt(idOfBlog, _store.userInfo.token);
      dispatch(deleteIt(idOfBlog))
      dispatch(displayNotification("Blog Deleted Successfully", true, 5))
    } catch (exception) {
      dispatch(displayNotification("failed to delete blog", false, 5))
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
      <h2>{`Logged in as ${loggedinName()}`}</h2>
      <button onClick={logOut} type="button">
        Logout
      </button>
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
      {[...props.blogList.blogs]
        .map((blog) => (
          <Blog key={blog.id} blog={blog} removeBlog={removeBlog} updateBlog={blogService.updateBlog}/>
      ))}
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    blogList: state.blogList,
  };
};

const ConnectedNotification = connect(mapStateToProps)(BlogList);

export default ConnectedNotification;
