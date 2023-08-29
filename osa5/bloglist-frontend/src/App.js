import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'

import { setNotification, clearNotification } from './reducers/notificationReducer'
import { addBlogs, setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const message = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const [createVisible, setCreateVisible] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      const filteredBlogs = blogs.filter((blog) => blog.user.username === user.username)

      dispatch(setBlogs(filteredBlogs))
    }

    if (user) {
      fetchData()
    }
  }, [user, blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
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
        username,
        password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 2500)
    }
  }

  const addBlog = (newBlog) => {
    blogService.create(newBlog).then((returnedBlog) => {
      let content = `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`

      dispatch(setNotification(content))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 2500)

      addBlogs(returnedBlog)
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
          errorMessage={message}
        />
      </div>
    )
  }

  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                message={message}
                user={user}
                handleLogout={handleLogout}
                hideWhenVisible={hideWhenVisible}
                showWhenVisible={showWhenVisible}
                addBlog={addBlog}
                blogs={blogs}
                setCreateVisible={setCreateVisible}
              />
            }
          />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  )
}

const Home = ({
  message,
  user,
  handleLogout,
  hideWhenVisible,
  showWhenVisible,
  addBlog,
  blogs,
  setCreateVisible
}) => {
  return (
    <div>
      <h2>blogs</h2>
      {message && <div className="success">{message}</div>}
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>{' '}
      </p>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm createBlog={addBlog} />
        <button onClick={() => setCreateVisible(false)}>cancel</button>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default App
