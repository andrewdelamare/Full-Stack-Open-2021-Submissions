/* eslint-disable react/prop-types */
import React, {} from 'react';

function BlogEntry({
  addBlog, author, setAuthor, title, setTitle, url, setUrl,
}) {
  return (
    <form onSubmit={addBlog}>
      <div>Add a new blog</div>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="Title "
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          name="Author "
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={url}
          name="URL "
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>

  );
}

export default BlogEntry;

/*
<form onSubmit={props.addNewPerson}>
            <div>
                Name: <input onChange={props.handleNewName} />
            </div>
            <div>
                Number: <input onChange={props.handleNewNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
*/
