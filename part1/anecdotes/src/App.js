import { useState } from 'react'

const Header2 = ({text}) => <h2>{text}</h2>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>  

const MostPopular = ({anecdotes, votes}) => {
  const mostPopularValue = Math.max(...votes)
  const mostPopularIndex = votes.indexOf(mostPopularValue)
  const totalNumberOfVotes = votes.reduce((a, b) => a + b, 0)

  if (totalNumberOfVotes > 0) {
    return (
      <p>{anecdotes[mostPopularIndex]}</p>
    )
  }
  return (
    <p>No votes yet - please help out!</p>
  )
}

const App = () => {
  
  // variables
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  // states
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  // event handlers
  const switchAnecdote = (numberOfAnecdotes) => {
    const newSelected = Math.floor(Math.random() * numberOfAnecdotes)
    setSelected(newSelected)
  }
  
  const vote = (selected) => {
    const newVotes = [ ...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  // render
  return (
    <>
      <Header2 text="Quote of the day" />
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        Has {votes[selected]} votes
      </p>
      <Button onClick={() => switchAnecdote(anecdotes.length)} text="Next anecdote" />
      <Button onClick={() => vote(selected)} text="Vote for this quote" />
      <Header2 text="Most popular anecdote" />
      <MostPopular anecdotes={anecdotes} votes={votes} />
    </>
  )
}

export default App