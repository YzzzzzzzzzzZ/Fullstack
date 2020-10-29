import React from 'react'
import ReactDOM from 'react-dom'

function Header(props) {
  return <h1>{props.name}</h1>
}

function Part(props) {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

function Content(props) {
  const parts = props.parts.map((row, i) => {
    return <Part key={i} part={row.part} exercises={row.exercises} />
  })
  return <div>{parts}</div>
}

function Total(props) {
  let count = 0
  props.parts.forEach((row) => {
    count += row.exercises
  })
  return <p>Number of exercises {count}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        part: 'Fundamentals of React',
        exercises: 10,
      },
      {
        part: 'Using props to pass data',
        exercises: 7,
      },
      {
        part: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
