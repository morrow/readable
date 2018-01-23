import React from 'react'
import './Flash.css'

const Flash = props => {
  return (
    <div id='flash' className={props.flash_type}>{props.message}</div>
  )
}

export default Flash
