import React from "react";

function CommentEntry({
  handleNewComment,
  comment,
  handleComment,
}) {
  return (
    <form onSubmit={handleNewComment}>
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
      <button id="createBlogButton" type="submit">
        create
      </button>
    </form>
  );
}

export default CommentEntry;
