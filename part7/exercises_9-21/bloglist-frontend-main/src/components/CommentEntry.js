import React from "react";
import { Form, Button } from 'react-bootstrap'

function CommentEntry({
  handleNewComment,
  comment,
  handleComment,
}) {
  return (
    <Form onSubmit={handleNewComment}>
      <div>Add a comment</div>
      <div>
        <input
          type="text"
          value={comment}
          id="comment"
          placeholder="Enter comment"
          onInputCapture={({ target }) => {
            handleComment(target.value);
          }}
          onChange={({ target }) => {
            handleComment(target.value);
          }}
        />
      </div>
      <Button id="createBlogButton" type="submit">
        create
      </Button>
    </Form>
  );
}

export default CommentEntry;
