import React from 'react'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
// import LoginForm from '../../bloglist-frontend/src/components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('info')

  const updateBlogList = async () => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    )
  }

  useEffect(() => {
    const localStorageUser = window.localStorage.getItem('authenticatedBlogUser')
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    updateBlogList()
  }, [])

  const addBlog = async (newBlog) => {

    try {
      const addedBlog = await blogService.addBlog(newBlog)
      setBlogs(blogs.concat(addedBlog))
      displayErrorMessage('New blog ' + addedBlog.title + ' by ' + addedBlog.author, 'info', 3000)
    } catch (exception) {
      console.log(exception)
      displayErrorMessage('Something went terribly wrong', 'error', 3000)
    }
  }

  const updateBlog = async (blogToUpdate, blogId) => {
    try {
      const updatedBlog = await blogService.updateBlog(blogToUpdate, blogId)
      updateBlogList()
      displayErrorMessage('Like added to ' + updatedBlog.title, 'info', 3000)
    } catch (exception) {
      console.log(exception)
      displayErrorMessage('Something went terribly wrong', 'error', 3000)
    }
  }

  const deleteBlog = async (blogId, blogTitle) => {
    if (window.confirm('Do you want to delete ' + blogTitle)) {
      try {
        console.log('confirmed')
        const deleted = await blogService.deleteBlog(blogId)
        updateBlogList()
        displayErrorMessage('Blog deleted', 'info', 3000)
      } catch (exception) {
        console.log(exception)
        displayErrorMessage('Something went terribly wrong', 'error', 3000)
      }
    }
  }

  const displayErrorMessage = (message, type, timeOut) => {
    setMessageType(type)
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, timeOut)
  }

  const loginHandler = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'authenticatedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      const message = exception.response.data.error
      displayErrorMessage(message, 'error', 3000)
    }

  }

  const logoutHandler = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('authenticatedBlogUser')

  }

  if (user === null) {

    return (

      <div>
        <Notification message={errorMessage} messageType={messageType} />
        <h1>Blogs</h1>
        <h2>Log in to see and post blogs</h2>
        <form onSubmit={loginHandler}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>

    )
  }

  return (

    <div>
      <Notification message={errorMessage} messageType={messageType} />
      <h1>Blogs</h1>
      <p>{user.name} logged in<button onClick={logoutHandler}>Log out</button></p>

      <Togglable buttonLabel="Add blog">
        <BlogForm
          blogSubmitHandler={addBlog}
        />
      </Togglable>

      <h2>All blogs</h2>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeHandler={updateBlog}
          deleteHandler={deleteBlog}
          loggedInUserId={user.username}
        />
      )}
    </div>
  )
}

export default App