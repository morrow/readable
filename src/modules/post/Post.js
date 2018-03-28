import React from 'react'
import './Post.css'
import { isAuthorizedToUpdate, timeSince } from '../app/appHelpers'
import VoteButtonContainer from '../app/vote/VoteButtonContainer'

const Post = props => {
  return (
    <div id={props.data.id} className='post'>
      <div className='post-score-actions' data-can-vote={!!!isAuthorizedToUpdate(props.data)}>
        <VoteButtonContainer target={props.data.id} direction='up' targetType='post' />
        <div className='post-score'>{ props.data.score }</div>
        <VoteButtonContainer target={props.data.id} direction='down' targetType='post' />
      </div>
      <div className='name'>{ props.data.title }</div>
      <div className='author'>posted by #{ props.data.user_id }</div>
      <div className='date'>{ timeSince(new Date(props.data.date)) }</div>
      <div className='category'>{ props.data.category }</div>
      <div className='body'>{ props.data.body }</div>
    </div>
  )
}

export default Post