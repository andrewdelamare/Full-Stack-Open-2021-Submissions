/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function Blog({ blog }) {
  const [visible, setVisible] = useState(false);

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

  return (

    <div>
      <div style={hideWhenVisible}>
        {blog.title}
        {' '}
        {blog.author}
        {' '}
        <button onClick={toggleVisibility} type="button">Show Details</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title}
        </div>
        <div>
          Author:
          {' '}
          {blog.author}
        </div>
        <div>
          Likes:
          {' '}
          {blog.likes}
          {' '}
          <button type="button">Like</button>
        </div>
        <div>
          URL:
          {' '}
          {blog.url}
        </div>
        <button onClick={toggleVisibility} type="button">Hide Details</button>
      </div>
    </div>

  );
}

export default Blog;
