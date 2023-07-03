import './Togglable';
import Togglable from './Togglable';
import { useState } from 'react'; // Import the useState hook
import blogService from '../services/blogs';

const Blog = ({ blog, user }) => {
  const [updatedBlog, setUpdatedBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const handleLike = async () => {
    const updatedLikes = updatedBlog.likes + 1
    const updatedBlogData = { ...updatedBlog, likes: updatedLikes }

    await blogService.update(updatedBlog.id, updatedBlogData)

    setUpdatedBlog(updatedBlogData)
  }

  return (
    <div style={blogStyle}>
      {updatedBlog.title} {updatedBlog.author} 
      <Togglable buttonLabel="view">
        <div>{updatedBlog.url}</div>
        <div>
          {`likes ${updatedBlog.likes}`} <button onClick={handleLike}>like</button>
        </div>
        <div>{user.name}</div>
      </Togglable>
    </div>
  )
}

export default Blog

