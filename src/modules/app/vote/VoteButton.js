import React from 'react'

const VoteButton = props => {
  let direction = {
    up: '▲',
    down: '▼'
  }[props.direction]
  return (
     <form
      className='vote-button-form'
      onSubmit={props.onSubmit}
      action='#'>
      <input
        type='hidden'
        name='target'
        id='target'
        value={props.target} />
      <input
        type='hidden'
        name='direction'
        id='direction'
        value={direction} />
      <input
        type='submit'
        value={direction} />
    </form>
  )
}

export default VoteButton