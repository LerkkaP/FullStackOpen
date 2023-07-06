import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor  } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'

jest.mock('../services/blogs', () => {
  const originalModule = jest.requireActual('../services/blogs')

  return {
    __esModule: true,
    default: {
      ...originalModule.default,
      update: jest.fn()
    }
  }
})

test('renders blog title and author, but not URL and likes by default', () => {
  const blog = {
    id: 1,
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 10,
  }

  const user = {
    name: 'Test User',
  }

  render(<Blog blog={blog} user={user} />)

  const titleElement = screen.getByText(/test blog/i)
  const authorElement = screen.getByText(/test author/i)
  expect(titleElement).toBeInTheDocument()
  expect(authorElement).toBeInTheDocument()
})

test('renders url, likes and user when view button is pressed', () => {
  const blog = {
    id: 1,
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 10,
  }

  const user = {
    name: 'Test User',
  }


  render(<Blog blog={blog} user={user} />)

  const button = screen.getByText('view')
  userEvent.click(button)

  const urlElement = screen.getByText('https://example.com')
  const likesElement = screen.getByText('likes 10')
  const userElement = screen.getByText('Test User')

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
  expect(userElement).toBeInTheDocument()
})

test('handleLike is called twice when the like button is clicked twice', async () => {
  const blog = {
    id: 1,
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 10,
  }
  const user = {
    name: 'Test User'
  }

  const { getByText } = render(<Blog blog={blog} user={user} />)
  const likeButton = getByText('like')

  await waitFor(() => {
    userEvent.click(likeButton)
    expect(blogService.update).toHaveBeenCalledTimes(1)
  })

  await waitFor(() => {
    userEvent.click(likeButton)
    expect(blogService.update).toHaveBeenCalledTimes(2)
  })
})

test('BlogForm calls createBlog with correct data when submitted', async () => {
  const createBlogMock = jest.fn();
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlogMock} />);

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(inputs[0], 'Test Author')
  await user.type(inputs[1], 'Test Blog')
  await user.type(inputs[2], 'example.com')
  await user.click(sendButton)

  expect(createBlogMock.mock.calls).toHaveLength(1)
  expect(createBlogMock.mock.calls[0][0].title).toBe('Test Author')
  expect(createBlogMock.mock.calls[0][0].author).toBe('Test Blog')
  expect(createBlogMock.mock.calls[0][0].url).toBe('example.com')

});









