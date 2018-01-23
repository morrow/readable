import React from 'react'
import './Post.css'

const Post = props => {
  return (
    <div id={props.data.id} className='post'>
      <div className='name'>Title: { props.data.title }</div>
      <div className='type'>Body: { props.data.body }</div>
      <div className='author'>Author: { props.data.author }</div>
      <div className='category'>Category: { props.data.category }</div>
    </div>
  )
}

export default Post