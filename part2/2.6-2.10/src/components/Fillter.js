import React from 'react'

const Fillter = (props) => {
  return (
    <div>
      Search:{' '}
      <input
        onInput={(e) => {
          props.onSearch(e.target.value)
        }}
      />
    </div>
  )
}

export default Fillter
