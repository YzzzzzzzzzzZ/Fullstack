import React from 'react'

const Persons = (props) => {
  const personList = props.list.map((row, i) => {
    return (
      <p key={i}>
        {row.name} {row.number} <button onClick={() => props.onRemove(row.id)}>删除</button>
      </p>
    )
  })
  return <div>{personList}</div>
}

export default Persons
