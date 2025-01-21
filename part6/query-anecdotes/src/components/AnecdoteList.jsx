import { React, useContext} from "react"
import PropTypes from 'prop-types'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../services/requests'
import NotificationContext from "../NotificationContext"

const Anecdotelist = ({ anecdotes }) => {

  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  })
  
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch({ type: "SHOW", payload: "You gave a vote to " + anecdote.content})
    setTimeout(() => {
      dispatch({type: "HIDE"})
    }, 5000)
  }

  

  /* const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes()
  })
  

  if ( result.isPending ) {
    return <div>Loading from database ... </div>
  }

  if ( result.isError ) {
    return <div>Error: {result.error.message} </div>
  }
  
  const localanecdotes = result.data
  console.log(localanecdotes) */

  return (

    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>)}
      </div>
    )
  

}

Anecdotelist.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ).isRequired},{
  localanecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ).isRequired
};

export default Anecdotelist 