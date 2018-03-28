import React from 'react'
import Post from './Post'
import Posts from './Posts'
import Comment from '../comment/Comment'
import PostForm from './form/PostForm'
import PostFormContainer from './form/PostFormContainer'
import VoteButtonContainer from '../app/vote/VoteButtonContainer'
import LinkContainer from '../app/link/LinkContainer'
import CommentFormContainer from '../comment/form/CommentFormContainer'
import { getNewComment } from '../comment/commentHelpers.js'
import { getCurrentUser, getSlug, isAuthorizedToUpdate, timeSince } from '../app/appHelpers'
import { getNewPost } from './postHelpers'
import { getCategoryLink } from '../category/categoryHelpers'

export const postRouter = (state, route)=> {
  if(state.app.id || state.app.slug){
    let post = state.post.posts.filter((post) => {
      return post.id == state.app.id || getSlug(post.title, post.id) === state.app.slug
    })[0]
    var comments = []
    if(post !== undefined){
      comments = state.comment.comments.filter(comment=>parseInt(comment.post_id) === parseInt(post.id))
    } else {
      return null
    }
    if(state.app.action === 'edit'){
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
          <h1>Post: {post.title}</h1>
          <Post data={post} />
          <div id='comments-wrap'>
            <div id='post-actions'>
              { isAuthorizedToUpdate(post) &&
                <span>
                  <LinkContainer href='edit' className='action'>Edit Post</LinkContainer>
                  <LinkContainer href='delete' className='action'>Delete Post</LinkContainer>
                </span>
              }
            </div>
            <h2>{comments.length} Comments</h2>
            { state.app.action === 'comment' ?
                <div id='new-comment'>
                  <h3>New Comment</h3>
                  <CommentFormContainer data={getNewComment(state)} commentAction='new'></CommentFormContainer>
                </div>
              :
                <LinkContainer href='comment' className='action'>Make a Comment</LinkContainer>
              }
            <div id='comments'>
              { comments.sort(comment=>comment.date).reverse().map(comment=>{
                return <Comment data={comment} />
              })}
            </div>
          </div>
        </div>
      )
    }
    else if(state.app.action === 'delete'){
      return (
        <div id='delete-post'>
          <h1>Delete Post?</h1>
          <PostFormContainer data={post} postAction='delete' />
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
      <Posts title='All Posts' posts={state.post.posts} sortMethod={state.app.sort.method} sortReversed={state.app.sort.reversed} comments={state.comment.comments} />
    )
  }
  return null

}