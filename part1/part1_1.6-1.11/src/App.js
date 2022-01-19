import React, { useState } from 'react'


const Average = (props) => {
  const {good, neutral, bad} = props
  let score = good - bad 
  let total = good + bad + neutral
  let ave = score/total
  return(
    <tr>
    <td>
    Average: 
    </td>
    <td>
    {ave}
    </td>
  </tr>
  )
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
  return( 
  <tr>
    <td>
    Positive: 
    </td>
    <td>
    {percent}%
    </td>
  </tr>)
}


const StatisticLine = (props) => {
  const {text, data} = props
return(
  <tr>
    <td>
    {text}
    </td>
    <td>
    {data}
    </td>
  </tr>
)
}

const Statistics = (props) => {
  const total = props.good+props.neutral+props.bad 

  return(
    <table>
      <tbody>
        <StatisticLine text={"Good: "} data={props.good} />
        <StatisticLine text={"Neutral: "} data={props.neutral} />
        <StatisticLine text={"Bad: "} data={props.bad} />
        <StatisticLine text={"All: "} data={total} />
        <Average good={props.good} neutral={props.neutral} bad={props.bad} />
        <Positive good={props.good} neutral={props.neutral} bad={props.bad} />
      </tbody>  
      
    </table>
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