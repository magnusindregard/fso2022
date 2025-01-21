import axios from 'axios'

const getAnecdotes = () => 
  axios.get('http://localhost:3001/anecdotes').then(res => res.data)

const updateAnecdote = updatedAnecdote => 
  axios.put(`http://localhost:3001/anecdotes/${updatedAnecdote.id}`, updatedAnecdote)

const postAnecdote = newAnecdote =>
  axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data)

export { getAnecdotes, updateAnecdote, postAnecdote }