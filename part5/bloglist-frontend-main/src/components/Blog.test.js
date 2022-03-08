/* eslint-disable no-undef */
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

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container;
  });

  test('only display title and author initially', () => {
    const someShown = container.querySelector('.someShown');
    const div = container.querySelector('.allShown');
    expect(div).toHaveStyle('display: none');
    expect(someShown).toHaveStyle('display: block');
  });

  test('after button click more info is displayed', () => {
    const button = screen.getByText('Show Details');
    userEvent.click(button);

    const div = container.querySelector('.allShown');
    const someShown = container.querySelector('.someShown');
    expect(div).toHaveStyle('display: block');
    expect(someShown).toHaveStyle('display: none');
  });
});
