import React, { useState } from 'react'


const Average = (props) => {
  const {good, neutral, bad} = props
  let score = good - bad 
  let total = good + bad + neutral
  let ave = score/total
  if (isNaN(ave)){
    return(
      <p>Average: 0</p>)
  }else{
    return(<p>Average: {ave}</p>)}
}

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

const Positive = (props) => {
  const {good, neutral, bad} = props
  const total = good + neutral + bad
  const ratio = good/total 
  const percent = ratio * 100
  if (isNaN(percent)){
    return(<p>Positive: </p>)
  }else{
    return(<p>Positive: {percent}%</p>)}
}

const Statistics = (props) => {

  return(
    <div>
      <p>Good: {props.good} </p>
      <p>Neutral: {props.neutral} </p>
      <p>Bad: {props.bad} </p>
      <Average good={props.good} neutral={props.neutral} bad={props.bad} />
      <Positive good={props.good} neutral={props.neutral} bad={props.bad} />
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

  if(good === 0 && neutral === 0 && bad === 0){return (
    <div>
      <h2>Give Feedback</h2>
      <Feedback setGood={handleGood} setNeutral={handleNeutral} setBad={handleBad} good="good" neutral='neutral' bad='bad' />
      <h2>No feedback given</h2>
    </div>
  )}else{
  return (
    <div>
      <h2>Give Feedback</h2>
      <Feedback setGood={handleGood} setNeutral={handleNeutral} setBad={handleBad} good="good" neutral='neutral' bad='bad' />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )}
}

export default App