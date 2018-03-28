import React from 'react'
import './SortButtonForm.css'

const SortButtonForm = props => {
  return (
     <form
      className='vote-button-form'
      data-currently-selected={props.sorted_by === props.attribute}
      onSubmit={props.onSubmit}
      action='#'>
      <input
        type='hidden'
        name='target'
        id='target'
        value={props.target} />
      <input
        type='hidden'
        name='attribute'
        id='attribute'
        value={props.attribute} />
      <input
        type='submit'
        value={props.attribute} />
    </form>
  )
}

export default SortButtonForm