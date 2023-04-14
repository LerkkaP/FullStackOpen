import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <div>
       <table>
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
            <td>{props.mark}</td>
          </tr>
        </tbody>
  </table>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button> 
  )
}

const Statistics = (props) => {
  if (props.all == 0) {
    return(
      <p>No feedback given</p>
    )
  } else {
    return(
      <div>
        <table>
          <tbody>
            <tr>
              <td><StatisticLine text="good" /></td>
              <td><StatisticLine value={props.good} /></td>  
            </tr>
            <tr>
              <td><StatisticLine text="neutral" /></td>
              <td><StatisticLine value={props.neutral} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="bad" /></td>
              <td><StatisticLine value={props.bad} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="all" /></td>
              <td><StatisticLine value={props.all} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="average" /></td>
              <td><StatisticLine value={props.average} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="positive" /></td>
              <td><StatisticLine value={props.positive} mark={"%"} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  const all = good + neutral + bad
  const average = (good * (1) + bad * (-1)) / (all) || 0
  const positive = (((good) / (all)) * 100) || 0

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text={"good"}/>
      <Button handleClick={increaseNeutral} text={"neutral"}/>
      <Button handleClick={increaseBad} text={"bad"}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App