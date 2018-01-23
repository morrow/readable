import React from 'react'
import Comment from './Comment'
import CommentForm from './form/CommentForm'
import CommentFormContainer from './form/CommentFormContainer'
import LinkContainer from '../app/link/LinkContainer'
import { getCurrentUser, getSlug, isAuthorizedToUpdate } from '../app/appHelpers'
import { getNewComment } from './commentHelpers'

export const commentRouter = (state, route)=> {
  if(state.app.comment_id || state.app.comment_slug){
    let comment = state.comment.comments.filter((comment) => {
      return comment.id == state.app.id || getSlug(comment.name) === state.app.slug
    })[0]
    if(comment == undefined){
      return null
    }
    if(state.app.action === 'edit'){
      return (
        <div id='comment'>
          <h1>Edit Comment</h1>
          <CommentFormContainer data={comment} commentAction='edit' />
        </div>
      )
    }
    else if(state.app.action === 'show'){
      return (
        <div id='comment'>
          <h1>Comment</h1>
          <Comment data={comment} />
          { isAuthorizedToUpdate(getCurrentUser(), comment) &&
            <LinkContainer href='edit' className='action'>Edit</LinkContainer>
          }
        </div>
      )
    }
  }
  else if(state.app.action === 'new' || state.app.action === 'comment'){
    return  (
      <div id='comment'>
        <CommentFormContainer data={getNewComment(state)} commentAction='new' />
      </div>
    )
  }
  else if(route === 'comment' || route === 'comments'){
    return (
      <div id='comments'>
        <h1>Comments</h1>
        { state.comment.comments.map(comment => {
          return (
            <LinkContainer href={comment.slug} className='comment'>{comment.name}</LinkContainer>
          )
          })
        }
        <LinkContainer href='new' className='action'>New Comment</LinkContainer>
      </div>
    )
  }
  return null

}