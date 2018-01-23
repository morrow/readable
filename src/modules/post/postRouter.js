import React from 'react'
import Post from './Post'
import Comment from '../comment/Comment'
import PostForm from './form/PostForm'
import PostFormContainer from './form/PostFormContainer'
import LinkContainer from '../app/link/LinkContainer'
import CommentFormContainer from '../comment/form/CommentFormContainer'
import { getNewComment } from '../comment/commentHelpers.js'
import { getCurrentUser, getSlug, isAuthorizedToUpdate } from '../app/appHelpers'
import { getNewPost } from './postHelpers'

export const postRouter = (state, route)=> {
  if(state.app.id || state.app.slug){
    let post = state.post.posts.filter((post) => {
      return post.id == state.app.id || getSlug(post.title) === state.app.slug
    })[0]
    let comments = state.comment.comments.filter(comment=>parseInt(comment.post_id) === parseInt(post.id))
    if(post == undefined){
      return null
    }
    else if(state.app.action === 'edit'){
      return (
        <div id='post'>
          <h1>Edit Post</h1>
          <PostFormContainer data={post} postAction='edit' />
        </div>
      )
    }
    else if(state.app.action === 'show' || state.app.action === 'comment'){
      return (
        <div id='post'>
          <h1>Post</h1>
          <Post data={post} />
          { isAuthorizedToUpdate(getCurrentUser(), post) &&
            <LinkContainer href='edit' className='action'>Edit</LinkContainer>
          }
          { state.app.action === 'comment' ?
            <CommentFormContainer data={getNewComment(state)} commentAction='new'></CommentFormContainer>
          :
            <LinkContainer href='comment' className='action'>Comment</LinkContainer>
          }
          <div id='comments'>
            { comments.map(comment=>{
              return <Comment data={comment} />
            })}
          </div>
        </div>
      )
    }
  }
  else if(state.app.action === 'new'){
    return  (
      <div id='post'>
        <h1>New Post</h1>
        <PostFormContainer data={getNewPost(state)} postAction='new' />
      </div>
    )
  }
  else if(route === 'post' || route === 'posts'){
    return (
      <div id='posts'>
        <h1>Posts</h1>
        { state.post.posts.map(post => {
          return (
            <LinkContainer href={post.slug} className='post'>{post.title}</LinkContainer>
          )
          })
        }
        <LinkContainer href='new' className='action'>New Post</LinkContainer>
      </div>
    )
  }
  return null

}