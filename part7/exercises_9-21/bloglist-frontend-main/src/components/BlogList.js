import React, { useState } from "react";
import store from "../store";
import { displayNotification } from "../reducers/notificationReducer";
import { useDispatch, connect } from "react-redux";
import BlogEntry from "./BlogEntry";
import Blog from "./Blog";
import Toggleable from "./Toggleable"
import blogService from "../services/blogs";
import { addNewBlog } from "../reducers/blogReducer";

const BlogList = (props) => {
  const blogs = props.blogs
  const [newBlog, setNewBlog] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
      const response = await blogService.addBlog(newBlog, store.user.token);
      const newList = blogs.concat(response);
      dispatch(displayNotification("Your blog was added!", true, 5))
      dispatch(addNewBlog(newList))
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      dispatch(displayNotification(`${exception.response.data}`, false, 5))
      console.log(exception);
    }
  };

  const removeBlog = async (idOfBlog) => {
    try {
      console.log(idOfBlog);
      await blogService.deleteIt(idOfBlog, store.user.token);
      const bl = await blogService.getAll();
      //setBlogs(bl);
      dispatch(displayNotification("Blog Deleted Successfully", true, 5))
    } catch (exception) {
      dispatch(displayNotification("failed to delete blog", false, 5))
      console.log(exception);
    }
  };

  return (
    <div>
      <h2>{`Logged in as ${store.user.username}`}</h2>
      <button onClick={console.log('you tried to log out')} type="button">
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
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} removeBlog={removeBlog} updateBlog={blogService.updateBlog}/>
      ))}
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};

const ConnectedNotification = connect(mapStateToProps)(BlogList);

export default ConnectedNotification;
