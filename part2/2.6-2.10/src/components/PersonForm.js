import React from 'react'

const PersonForm = (props) => {
  return (
    <form>
      <div>
        name:{' '}
        <input
          onInput={(e) => {
            props.setName(e.target.value)
          }}
        />
      </div>
      <div>
        number:{' '}
        <input
          onInput={(e) => {
            props.setNumber(e.target.value)
          }}
        />
      </div>
      <div>
        <button type="submit" onClick={(e) => props.onSubmit(e)}>
          add
        </button>
      </div>
    </form>
  )
}

export default PersonForm
