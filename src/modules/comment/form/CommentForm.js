import React from 'react'
import './CommentForm.css'

const CommentForm = props => {
  return (
    <form
      className='comment-form'
      onSubmit={props.onSubmit}
      action='#'
      data-comment-action={props.commentAction}>
      <div className='field'>
        <label htmlFor='text'>Text: </label>
        <textarea
          name='text'
          id='text'
          defaultValue={props.data.text} />
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
        name='score'
        id='score'
        defaultValue={props.data.score} />
      <input
        type='hidden'
        name='post_id'
        id='post_id'
        defaultValue={props.data.post_id} />
      <input
        type='hidden'
        name='post_slug'
        id='post_slug'
        defaultValue={props.data.post_slug} />
      <input
        type='hidden'
        name='commentAction'
        id='commentAction'
        defaultValue={props.commentAction} />
      { props.commentAction == 'delete' ?
        <div id='delete-actions'>
          <input type='submit' name='delete_confirmation' value='delete' />
          <button onClick={props.cancelAction}>Cancel</button>
        </div>
      :
        <input type='submit' />
      }
    </form>
  )
}

export default CommentForm