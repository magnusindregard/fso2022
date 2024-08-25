import { useState } from 'react'

const BlogForm = ({ blogSubmitHandler }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    blogSubmitHandler(newBlog)

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Add blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor='Title'>Title</label>
          <input
            type='text'
            value={title}
            name='Title'
            id='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor='Author'>Author</label>
          <input
            type='text'
            value={author}
            name='Author'
            id='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor='URL'>URL</label>
          <input
            type='text'
            value={url}
            name='URL'
            id='URL'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )

}

export default BlogForm