import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeHandler, deleteHandler, loggedInUserId }) => {

  const [isExpanded, toggleIsExpanded] = useState(false)

  const showOnlyIfExpanded = { display: isExpanded ? '' : 'none' }
  const blogStyles = {
    border: '2px solid black',
    padding: '4px',
    margin: '2px 0px'
  }

  let buttonLabel = isExpanded ? 'Hide details' : 'Show details'

  const toggleVisibility = () => {
    toggleIsExpanded(!isExpanded)
  }

  const addLike = (event) => {
    event.preventDefault()
    const updatedLikes = blog.likes + 1
    const blogToUpdate = {
      user: blog.user.id,
      likes: updatedLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    likeHandler(blogToUpdate, blog.id)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    deleteHandler(blog.id, blog.title)
  }

  const addedByLoggedInUser = (loggedInUserId === blog.user.username) ? true : false

  return (
    <div style={blogStyles}>
      <div>
        <h2>{blog.title} by {blog.author}</h2>
        <button className='expand-button' onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div className='expandable-content' style={showOnlyIfExpanded}>
        <p>URL: <a href={blog.url}>{blog.url}</a></p>
        <p>Likes: {blog.likes} <button className='like-button' onClick={addLike}>Like</button></p>
        <p>Added by: {blog.user.name}</p>
        {addedByLoggedInUser ?
          <p><button onClick={deleteBlog}>Delete</button></p> : null
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeHandler: PropTypes.func.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired
}

export default Blog