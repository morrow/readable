import React from 'react'
import './Comment.css'
import { isAuthorizedToUpdate, timeSince } from '../app/appHelpers'
import { getCommentPath } from './commentHelpers'
import VoteButtonContainer from '../app/vote/VoteButtonContainer'
import LinkContainer from '../app/link/LinkContainer'

const Comment = props => {
  return (
    <div id={props.data.id} className='comment'>
      <div className='comment-score-actions' data-can-vote={!!!isAuthorizedToUpdate(props.data)}>
        <VoteButtonContainer target={props.data.id} direction='up' targetType='comment' />
        <div className='comment-score'>{ props.data.score }</div>
        <VoteButtonContainer target={props.data.id} direction='down' targetType='comment' />
      </div>
      <div className='comment-date'>{ timeSince(new Date(props.data.date)) }</div>
      <div className='comment-user'> by #{ props.data.user_id }</div>
      <div className='comment-body'>{ props.data.text }</div>
      <div className='comment-owner-actions'>
      { isAuthorizedToUpdate(props.data) &&
        <div>
          <LinkContainer href={getCommentPath(props.data, 'edit')} className='action'>Edit Comment</LinkContainer>
          <LinkContainer href={getCommentPath(props.data, 'delete')} className='action'>Delete Comment</LinkContainer>
        </div>
      }
      </div>
    </div>
  )
}

export default Comment