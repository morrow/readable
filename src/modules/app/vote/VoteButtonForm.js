import React from 'react'
import './VoteButtonForm.css'

const VoteButtonForm = props => {
  let direction = {
    up: '▲',
    down: '▼'
  }[props.direction]
  return (
     <form
      className='vote-button-form'
      onSubmit={props.onSubmit}
      action='#'
      data-direction={props.direction}
      data-voted-on={props.voted}>
      <input
        type='hidden'
        name='target'
        id='target'
        value={props.target} />
      <input
        type='hidden'
        name='direction'
        id='direction'
        value={props.direction} />
      <input
        type='hidden'
        name='targetType'
        id='targetType'
        value={props.targetType} />
      <input
        type='submit'
        value={direction} />
    </form>
  )
}

export default VoteButtonForm