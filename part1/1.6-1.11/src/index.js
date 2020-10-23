import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  const { text, handleClick } = props
  return <button onClick={handleClick}>{text}</button>
}

const Statistic = (props) => {
  const { name, sum, count } = props
  let percent
  if (sum) {
    percent = Math.round((count / sum) * 10000) / 100
  } else {
    percent = '--'
  }
  return (
    <p>
      {name}：{count}，占：{percent}%
    </p>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const sum = good + neutral + bad

  if (sum) {
    return (
      <div>
        <div>总数：{sum}</div>
        <Statistic name="好" sum={sum} count={good} />
        <Statistic name="中" sum={sum} count={neutral} />
        <Statistic name="差" sum={sum} count={bad} />
      </div>
    )
  } else {
    return <p>尚未填写评价。</p>
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGoodClick = () => setGood(good + 1)
  const onNeutralClick = () => setNeutral(neutral + 1)
  const onBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h5>评价：</h5>
      <div>
        <Button text="好" handleClick={onGoodClick} />
        <Button text="中" handleClick={onNeutralClick} />
        <Button text="差" handleClick={onBadClick} />
      </div>
      <h5>结果：</h5>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
