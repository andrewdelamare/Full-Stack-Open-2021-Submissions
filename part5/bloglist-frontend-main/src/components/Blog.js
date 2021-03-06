/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function Blog({ blog, removeBlog, updateBlog }) {
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
    updateBlog(updatedBlog);
  };

  const deleteBlog = async () => {
    const message = 'Do you really want to delete this blog?';
    if (window.confirm(message)) {
      removeBlog(blog.id);
    }
  };
  return (

    <div className="blog">
      <div style={hideWhenVisible} className="someShown">
        {blog.title}
        {' '}
        {blog.author}
        {' '}
        <button onClick={toggleVisibility} type="button" id="showDetailsButton">Show Details</button>
      </div>
      <div style={showWhenVisible} className="allShown">
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
          <button type="button" onClick={addLike} id="likeButton">Like</button>
        </div>
        <div className="url">
          URL:
          {' '}
          {blog.url}
        </div>
        <button
          onClick={deleteBlog}
          type="button"
          id="deleteBlogButton"
        >
          Delete Blog

        </button>
      </div>
    </div>

  );
}

export default Blog;
