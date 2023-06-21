import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setnewTitle] = useState('')
  const [newAuthor, setnewAuthor] = useState('')
  const [newUrl, setnewUrl] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll();
      const filteredBlogs = blogs.filter(
        (blog) => blog.user.username === user.username
      );
      setBlogs(filteredBlogs);
    };

    if (user) {
      fetchData();
    }
  }, [user]);
  
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
    setErrorMessage("wrong username or password")
    setTimeout(() => {
      setErrorMessage('')
    }, 2500);
  }
}

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
          setTimeout(() => {
            setMessage('')
          }, 2500);
        setBlogs(blogs.concat(returnedBlog))
        setnewTitle('')
      })
  }

  const handleTitleChange = (event) => {
    setnewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setnewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setnewUrl(event.target.value)
  }


  const loginForm = () => (
    <div>
    <h2>Log in to application</h2>
    {errorMessage && <div className='error'>{errorMessage}</div>}
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
        type='text'
        value={username}
        name="Username"
        onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
        type='password'
        value={password}
        name='Password'
        onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <div>
        <button type='submit'>login</button>
      </div>
    </form>
  </div>
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input 
          type='text'
          value={newTitle}
          onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input 
          type='text'
          value={newAuthor}
          onChange={handleAuthorChange} 
          />
        </div>
        <div>
          url:
          <input 
          type='text'
          value={newUrl}
          onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )

  if (user === null) {
    return (
      loginForm()
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message && <div className='success'>{message}</div>}
      <p>{user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default App