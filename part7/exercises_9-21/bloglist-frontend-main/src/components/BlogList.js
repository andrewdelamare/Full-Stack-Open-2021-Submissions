import React from "react";

function BlogList({ blogs }) {
  return (
    <div>
      <h2>{`Logged in as ${user.username}`}</h2>
      <button onClick={resetUser} type="button">
        Logout
      </button>
      <BlogEntry
        addBlog={handleNewBlog}
        author={author}
        setAuthor={setAuthor}
        title={title}
        setTitle={setTitle}
        url={url}
        setUrl={setUrl}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;
