/* eslint-disable react/prop-types */
import React from 'react';

// I had to move state out to the app component in order
// to test things the way that the course exercises demanded

function BlogEntry({
  handleNewBlog, title, handleTitle, author, handleAuthor, url, handleUrl,
}) {
  return (
    <form onSubmit={handleNewBlog}>
      <div>Add a new blog</div>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="Title "
          placeholder="Enter title"
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
          placeholder="Enter author"
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
          placeholder="Enter URL"
          onInputCapture={({ target }) => {
            handleUrl(target.value);
          }}
          onChange={({ target }) => {
            handleUrl(target.value);
          }}
        />
      </div>
      <button type="submit">create</button>
    </form>

  );
}

export default BlogEntry;
