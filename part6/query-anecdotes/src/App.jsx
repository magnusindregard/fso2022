import { useQuery, useMutation } from '@tanstack/react-query'
import { getAnecdotes } from './services/requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdotelist from './components/AnecdoteList'

const App = () => {


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  

  if ( result.isPending ) {
    return <div>Loading from database ... </div>
  }

  if ( result.isError ) {
    return <div>Error: {result.error.message} </div>
  }
  
  const anecdotes = result.data
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      <Anecdotelist anecdotes={anecdotes} />
    
    </div>
  )
}

export default App
