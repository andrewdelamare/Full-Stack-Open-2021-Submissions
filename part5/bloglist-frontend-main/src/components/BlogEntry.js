/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function BlogEntry({ handleNewBlog, setNewBlog }) {
  const [title, setTitle] = useState(' ');
  const [author, setAuthor] = useState(' ');
  const [url, setUrl] = useState(' ');

  const newBlog = {
    title,
    author,
    url,
  };

  const handleTitle = async (value) => {
    await setTitle(value);
    console.log(title);
    setNewBlog(newBlog);
  };

  const handleAuthor = async function (value) {
    await setAuthor(value);
    console.log(author);
    setNewBlog(newBlog);
  };

  const handleUrl = async function (value) {
    await setUrl(value);
    console.log(url);
    setNewBlog(newBlog);
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
          onInputCapture={({ target }) => {
            handleTitle(target.value);
          }}
          onChange={({ target }) => {
            handleTitle(target.value);
          }}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          name="Author "
          onInputCapture={({ target }) => {
            handleAuthor(target.value);
          }}
          onChange={({ target }) => {
            handleAuthor(target.value);
          }}
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={url}
          name="URL "
          onInputCapture={({ target }) => {
            handleUrl(target.value);
          }}
          onChange={({ target }) => {
            handleUrl(target.value);
            console.log(url);
          }}
        />
      </div>
      <button type="submit">create</button>
    </form>

  );
}

export default BlogEntry;
