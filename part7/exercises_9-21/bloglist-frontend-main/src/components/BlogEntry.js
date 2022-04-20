/* eslint-disable react/prop-types */
import React from "react";
import { Table, Form, Button } from 'react-bootstrap'
// I had to move state out to the app component in order
// to test things the way that the course exercises demanded

function BlogEntry({
  handleNewBlog,
  title,
  handleTitle,
  author,
  handleAuthor,
  url,
  handleUrl,
}) {
  return (
    <Form onSubmit={handleNewBlog}>
      <div>Add a new blog</div>
      <div>
        Title:
        <input
          type="text"
          value={title}
          id="title"
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
          id="author"
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
          id="url"
          placeholder="Enter URL"
          onInputCapture={({ target }) => {
            handleUrl(target.value);
          }}
          onChange={({ target }) => {
            handleUrl(target.value);
          }}
        />
      </div>
      <Button id="createBlogButton" type="submit">
        create
      </Button>
    </Form>
  );
}

export default BlogEntry;
