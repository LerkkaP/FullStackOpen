import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders blog title and author, but not URL and likes by default', () => {
    const blog = {
      id: 1,
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://example.com',
      likes: 10,
    };
  
    const user = {
      name: 'Test User',
    };
  
    render(<Blog blog={blog} user={user} />);
  
    const titleElement = screen.getByText(/test blog/i);
    const authorElement = screen.getByText(/test author/i);
    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
  });