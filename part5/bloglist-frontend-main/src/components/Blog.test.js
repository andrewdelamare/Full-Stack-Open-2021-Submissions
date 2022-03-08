/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

describe('Blog', () => {
  test('only displays title & author initially', () => {
    const blog = {
      title: 'A Cool thing',
      author: 'Someone Also cool',
      url: 'wwww.fi',
      likes: 78,
    };

    render(<Blog blog={blog} />);

    const element = screen.getByText('A Cool thing Someone Also cool');
    const url = screen.queryByText('wwww.fi');
    const likes = screen.queryByLabelText('likes');
    expect(element).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });
});
