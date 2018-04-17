import React from 'react'
import LinkContainer from '../app/link/LinkContainer'
import './Home.css'

const Home = props => {
  return (
    <div id='home'>
      <h1>Welcome to Readable</h1>
      Get started by <LinkContainer href='/posts/new' className='action'>Making a post</LinkContainer>
      <br/>
      Or browse existing <LinkContainer href='/posts' className='action'>Posts</LinkContainer>
      <span> or </span>
      <LinkContainer href='/categories' className='action'>Categories</LinkContainer>
    </div>
  )
}

export default Home