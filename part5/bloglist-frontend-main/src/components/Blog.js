/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import blogService from '../services/blogs';

function Blog({ blog, removeBlog }) {
  const [visible, setVisible] = useState(false);
  const [updatedBlog, setUpdatedBlog] = useState(blog);
  const [likes, setLikes] = useState(blog.likes);

  const hideWhenVisible = {
    display: visible ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const showWhenVisible = {
    display: visible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = () => {
    const blogCopy = blog;
    blogCopy.likes += 1;
    setLikes(likes + 1);
    setUpdatedBlog(blogCopy);
    blogService.updateBlog(updatedBlog);
  };

  const deleteBlog = async () => {
    const message = 'Do you really want to delete this blog?';
    if (window.confirm(message)) {
      removeBlog(blog.id);
    }
  };
  return (

    <div className="blog">
      <div style={hideWhenVisible} className="t&a">
        {blog.title}
        {' '}
        {blog.author}
        {' '}
        <button onClick={toggleVisibility} type="button">Show Details</button>
      </div>
      <div style={showWhenVisible}>
        <div className="title">
          {blog.title}
        </div>
        <button onClick={toggleVisibility} type="button">Hide Details</button>
        <div className="author">
          Author:
          {' '}
          {blog.author}
        </div>
        <div className="likes">
          Likes:
          {' '}
          {likes}
          {' '}
          <button type="button" onClick={addLike}>Like</button>
        </div>
        <div className="url">
          URL:
          {' '}
          {blog.url}
        </div>
        <button
          onClick={deleteBlog}
          type="button"
        >
          Delete Blog

        </button>
      </div>
    </div>

  );
}

export default Blog;
