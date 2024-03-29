import './Togglable'
import Togglable from './Togglable'
import blogService from '../services/blogs'

import { updateLikes } from '../reducers/blogReducer'

import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const updatedBlog = blog

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const updatedLikes = updatedBlog.likes + 1
    const updatedBlogData = { ...updatedBlog, likes: updatedLikes }

    await blogService.update(updatedBlog.id, updatedBlogData)
    dispatch(updateLikes(updatedBlogData))
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      {updatedBlog.title} {updatedBlog.author}
      <Togglable buttonLabel="view">
        <div>{updatedBlog.url}</div>
        <div>
          {`likes ${updatedBlog.likes}`} <button onClick={handleLike}>like</button>
        </div>
        <div>{user.name}</div>
        <div>
          <button onClick={handleDelete}>remove</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
