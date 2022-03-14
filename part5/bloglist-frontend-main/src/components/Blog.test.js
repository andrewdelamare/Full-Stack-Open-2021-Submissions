import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog', () => {
  const blog = {
    title: 'A Cool thing',
    author: 'Someone Also cool',
    url: 'wwww.fi',
    likes: 78,
  };
  let container;

  test('only display title and author initially', () => {
    container = render(<Blog blog={blog} />).container;
    const someShown = container.querySelector('.someShown');
    const div = container.querySelector('.allShown');
    expect(div).toHaveStyle('display: none');
    expect(someShown).toHaveStyle('display: block');
  });

  test('display more info after button click', () => {
    container = render(<Blog blog={blog} />).container;
    const button = screen.getByText('Show Details');
    userEvent.click(button);

    const div = container.querySelector('.allShown');
    const someShown = container.querySelector('.someShown');
    expect(div).toHaveStyle('display: block');
    expect(someShown).toHaveStyle('display: none');
  });
  test('register two clicks if like button clicked twice', () => {
    const mockHandler = jest.fn();
    container = render(<Blog blog={blog} updateBlog={mockHandler} />).container;
    const buttonShow = screen.getByText('Show Details');
    userEvent.click(buttonShow);

    const buttonLike = screen.getByText('Like');
    userEvent.click(buttonLike);
    userEvent.click(buttonLike);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
