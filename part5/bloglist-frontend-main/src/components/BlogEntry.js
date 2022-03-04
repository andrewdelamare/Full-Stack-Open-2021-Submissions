/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function BlogEntry({ handleNewBlog, setNewBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const newBlog = {
    title,
    author,
    url,
  };

  return (
    <form onSubmit={handleNewBlog}>
      <div>Add a new blog</div>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="Title "
          onChange={({ target }) => {
            setTitle(target.value);
            setNewBlog(newBlog);
          }}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          name="Author "
          onChange={({ target }) => {
            setAuthor(target.value);
            setNewBlog(newBlog);
          }}
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={url}
          name="URL "
          onChange={({ target }) => {
            setUrl(target.value);
            setNewBlog(newBlog);
          }}
        />
      </div>
      <button type="submit">create</button>
    </form>

  );
}

export default BlogEntry;
