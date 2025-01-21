import { postAnecdote } from "../services/requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {



  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const addAnecdoteMutation = useMutation({
    mutationFn: postAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    },
    onError: () => {
      dispatch({type: "SHOW", payload: "Anecdotes must be at least 5 characters long"})
      setTimeout(() => {
        dispatch({type: "HIDE"})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    addAnecdoteMutation.mutate({
      content: content,
      votes: 0
    })
    
    event.target.anecdote.value = ''
    dispatch({type: "SHOW", payload: "You added a new anecdote"})
    setTimeout(() => {
      dispatch({type: "HIDE"})
    }, 5000)

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
