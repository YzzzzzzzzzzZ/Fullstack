import React from 'react'

const Part = (props) => {
  const { id, name, exercises } = props
  return (
    <li>
      {name}:{exercises}
    </li>
  )
}

const Course = ({ course }) => {
  const total = course.parts.reduce((a, s) => {
    if (a.exercises) return a.exercises + s.exercises
    else return a + s.exercises
  })
  return (
    <div>
      <h3>{course.name}</h3>
      <ul>
        {course.parts.map((row) => {
          return <Part key={row.id} name={row.name} exercises={row.exercises} />
        })}
      </ul>
      <p>Total:{total}</p>
    </div>
  )
}

export default Course