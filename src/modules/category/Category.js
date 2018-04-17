import React from 'react'
import Posts from '../post/Posts'
import './Category.css'

const Category = props => {
  return (
    <div id='category'>
      <Posts title={props.title}
             posts={props.posts}
             comments={props.comments}
             sortMethod={props.sortMethod}
             sortReversed={props.sortReversed} />
    </div>
  )
}

export default Category