import './Togglable';
import Togglable from './Togglable';

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <div>{blog.url}</div>
        <div>
          {"likes 0"} <button>like</button>
        </div>
        <div>{user.name}</div>
      </Togglable>
    </div>
  );
};

export default Blog;
