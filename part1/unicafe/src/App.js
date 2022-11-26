import { useState } from 'react'

const Header2 = ({text}) => <h2>{text}</h2>

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>  
  )
}

const StatisticLine = ({ name, value }) => <tr><td>{name}</td><td>{value}</td></tr>

const Statistics = ({ feedbacks }) => {
  console.log(feedbacks)
  const total = feedbacks.good + feedbacks.neutral + feedbacks.bad
  const average = (feedbacks.good * 1 + feedbacks.bad * -1) / total
  const positive = (feedbacks.good * 100 / total).toString() + " %"
  if (total > 0) {
    return (
      <>
        <Header2 text="Statistics" />
        <table>
          <StatisticLine name="Good" value={feedbacks.good} />
          <StatisticLine name="Neutral" value={feedbacks.neutral} />
          <StatisticLine name="Bad" value={feedbacks.bad} />
          <StatisticLine name="All" value={total} />
          <StatisticLine name="Average" value={average} />
          <StatisticLine name="Positive" value={positive} />
        </table>
      </>
    )
  }
  return (
    <>
      <Header2 text="Statistics" />
      <p>No stats to show, please push the buttons</p>
    </>
  )
}

const Feedback = ({ feedbacks, clickHandlers }) => {
  return (
    <>
      <Header2 header="Give feedback" />
      <Button onClick={() => clickHandlers.increaseGoodByOne()} text="Good" />
      <Button onClick={() => clickHandlers.increaseNeutralByOne()} text="Neutral" />
      <Button onClick={() => clickHandlers.increaseBadByOne()} text="Bad" />
    </>
  )
}


const App = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const clickHandlers = {
    increaseGoodByOne: () => {
      const newFeedbacks = {
        ...feedbacks,
        good: feedbacks.good + 1
      }
      setFeedbacks(newFeedbacks)
    },
    increaseNeutralByOne: () => {
      const newFeedbacks = {
        ...feedbacks,
        neutral: feedbacks.neutral + 1
      }
      setFeedbacks(newFeedbacks)
    },
    increaseBadByOne: () => {
      const newFeedbacks = {
        ...feedbacks,
        bad: feedbacks.bad + 1
      }
      setFeedbacks(newFeedbacks)
   }
  }
  
  return (
    <div>
      <Feedback feedbacks={feedbacks}  clickHandlers={clickHandlers} />
      <Statistics feedbacks={feedbacks}  />
    </div>
  )
}

export default App