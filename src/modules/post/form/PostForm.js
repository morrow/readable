import React from 'react'
import './PostForm.css'

const PostForm = props => {
  return (
    <form
      className='post-form'
      onSubmit={props.onSubmit}
      action='#'>
      <div className='field'>
        <label htmlFor='title' id='title'>Title:</label>
        <input
          name='title'
          id='title'
          type='text'
          defaultValue={props.data.title} />
      </div>
      <div className='field'>
        <label htmlFor='category' id='category'>Category:</label>
        <input
          name='category'
          id='category'
          type='text'
          defaultValue={props.data.category || ''} />
      <div className='field'>
        <label htmlFor='body' id='body'>Body:</label>
        <textarea
          name='body'
          id='body'
          defaultValue={props.data.body || ''} />
      </div>
      </div>
      <input
        type='hidden'
        name='id'
        id='id'
        defaultValue={props.data.id} />
      <input
        type='hidden'
        name='slug'
        id='slug'
        defaultValue={props.data.slug} />
      <input
        type='hidden'
        name='user_id'
        id='user_id'
        defaultValue={props.data.user_id} />
      <input
        type='hidden'
        name='author'
        id='author'
        defaultValue={props.data.author} />
      <input
        type='hidden'
        name='postAction'
        id='postAction'
        defaultValue={props.postAction} />
      <input type='submit' />
    </form>
  )
}

export default PostForm