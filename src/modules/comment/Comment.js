import React from 'react'
import './Comment.css'
import LinkContainer from '../app/link/LinkContainer'
import VoteButtonContainer from '../app/vote/VoteButtonContainer'
import { getCurrentUser, isAuthorizedToUpdate } from '../app/appHelpers'

const Comment = props => {
  let user = getCurrentUser()
  return (
    <div id={props.data.id} className='comment'>
      <div className='comment-score'>{ props.data.score }</div>
      <div className='comment-body'>{ props.data.text }</div>
      { isAuthorizedToUpdate(user, props.data) &&
        <div className='comment-owner-actions'>
          <LinkContainer href={`/comments/${props.data.id}/edit`} className='action'>Edit Comment</LinkContainer>
          <LinkContainer href={`/comments/${props.data.id}/delete`} className='action'>Delete Comment</LinkContainer>
        </div>
      }
      { !!!isAuthorizedToUpdate(user, props.data) &&
        <div className='comment-actions'>
          <VoteButtonContainer target={props.data.id} direction='up' />
          <VoteButtonContainer target={props.data.id} direction='down' />
        </div>
      }
    </div>
  )
}

export default Comment