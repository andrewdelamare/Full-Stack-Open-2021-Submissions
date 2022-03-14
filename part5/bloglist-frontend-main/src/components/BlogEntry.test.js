import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogEntry from './BlogEntry';

describe('Blog entry form', () => {
  const blog = {
    title: 'A Cool thing',
    author: 'Someone Also cool',
    url: 'wwww.fi',
    likes: 78,
  };

  test('calls event handler and passes it correct information', () => {
    const createBlog = jest.fn((e) => e.preventDefault());
    const handleTitle = jest.fn();
    const handleAuthor = jest.fn();
    const handleUrl = jest.fn();
    render(<BlogEntry
      handleNewBlog={createBlog}
      handleTitle={handleTitle}
      handleAuthor={handleAuthor}
      handleUrl={handleUrl}
    />);

    const inputT = screen.getByPlaceholderText('Enter title');
    const inputA = screen.getByPlaceholderText('Enter author');
    const inputU = screen.getByPlaceholderText('Enter URL');
    const sendButton = screen.getByText('create');

    userEvent.type(inputT, blog.title);
    userEvent.type(inputA, blog.author);
    userEvent.type(inputU, blog.url);
    userEvent.click(sendButton);


    const tl = handleTitle.mock.calls.length - 1;
    const sentT = handleTitle.mock.calls[tl];
    const al = handleAuthor.mock.calls.length - 1;
    const sentA = handleAuthor.mock.calls[al];
    const ul = handleUrl.mock.calls.length - 1;
    const sentU = handleUrl.mock.calls[ul];

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(sentT[0]).toMatch(blog.title);
    expect(sentA[0]).toMatch(blog.author);
    expect(sentU[0]).toMatch(blog.url);
  });
});
