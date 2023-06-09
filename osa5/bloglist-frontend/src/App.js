import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [createVisible, setCreateVisible] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      const filteredBlogs = blogs.filter(
        (blog) => blog.user.username === user.username
      )
      const sortedBlogs = filteredBlogs.sort((a, b) => b.likes - a.likes)

      setBlogs(sortedBlogs)
    }

    if (user) {
      fetchData()
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 2500)
    }
  }

  const addBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setMessage('')
        }, 2500)
        setBlogs(blogs.concat(returnedBlog))
        setCreateVisible('')
      })
  }

  if (user === null) {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          errorMessage={errorMessage}
        />
      </div>
    )
  }

  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }
  return (

    <div>
      <h2>blogs</h2>
      {message && <div className='success'>{message}</div>}
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm
          createBlog={addBlog}
        />
        <button onClick={() => setCreateVisible(false)}>cancel</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
    </div>
  )}


export default App