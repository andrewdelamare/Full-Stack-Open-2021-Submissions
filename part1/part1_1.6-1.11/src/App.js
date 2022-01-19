import React, { useState } from 'react'

const Button = (props) => {
  return(<button onClick={props.setType}>{props.feedback}</button>)
}

const Feedback = (props) => {
  return (
  <div>
    <Button setType={props.setGood} feedback={props.good}/>
    <Button setType={props.setNeutral} feedback={props.neutral} />
    <Button setType={props.setBad} feedback={props.bad} />
  </div>)
}

const Statistics = (props) => {

  return(
    <div>
      <p>Good: {props.good} </p>
      <p>Neutral: {props.neutral} </p>
      <p>Bad: {props.bad} </p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () => {
    setGood(good + 1) 
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <Feedback setGood={handleGood} setNeutral={handleNeutral} setBad={handleBad} good="good" neutral='neutral' bad='bad' />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App