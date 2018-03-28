import React from 'react'
import './Error.css'
import LinkContainer from '../app/link/LinkContainer'

export const errorRouter = (state)=> {
  return (
    <div id='error_page'>
      <h2>404 Page not found</h2>
      <p>A page at <span id='path'>{state.app.path}</span> does not exist.</p>
      <p><LinkContainer href='/'>Click Here</LinkContainer> to go to the home page.</p>
    </div>
  )
}