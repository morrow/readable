import React from 'react'
import './Post.css'
import { isAuthorizedToUpdate, timeSince } from '../app/appHelpers'
import VoteButtonContainer from '../app/vote/VoteButtonContainer'
import LinkContainer from '../app/link/LinkContainer'
import { getCategoryLink } from '../category/categoryHelpers'
import { getUserLink } from '../user/userHelpers'
import { getPostPath } from './postHelpers'
import SortButtonContainer from '../app/sort/SortButtonContainer'


const Posts = props => {
  var posts = props.posts.sort(props.sortMethod)
  if(props.sortReversed){
    posts = posts.reverse()
  }
  return (
    <div id='posts'>
        <h1>{props.title}</h1>
        <div className='sort-by'>
          Sort by:
          <SortButtonContainer target='post' attribute='date' />
          <SortButtonContainer target='post' attribute='score' />
          <SortButtonContainer target='post' attribute='comments' />
        </div>
        {
          posts.map(post => {
            let comments = props.comments.filter(comment=>parseInt(comment.post_id) === parseInt(post.id))
            return (
              <div
                className='post'
                data-sort-date={post.date}
                data-sort-score={post.score}
                data-sort-comments={comments.length}>
                <div className='post-score-actions' data-can-vote={!!!isAuthorizedToUpdate(post)}>
                  <VoteButtonContainer target={post.id} direction='up' targetType='post' />
                  <div className='post-score'>{ post.score }</div>
                  <VoteButtonContainer target={post.id} direction='down' targetType='post' />
                </div>
                <div className='post-title'>
                  <LinkContainer href={getPostPath(post)}>{post.title}</LinkContainer>
                </div>
                <div className='post-category'>
                  <LinkContainer href={getCategoryLink(post.category)}>{post.category}</LinkContainer>
                </div>
                <div className='post-author'>
                  <LinkContainer href={getUserLink(post.user_id)}>User #{post.user_id}</LinkContainer>
                </div>
                <div className='post-number-of-comments'>
                  <LinkContainer href={getPostPath(post)}>{comments.length} comments</LinkContainer>
                </div>
                <div className='post-date'>
                  { timeSince(new Date(post.date)) }
                </div>
                { isAuthorizedToUpdate(post) &&
                  <div className='post-actions'>
                    <LinkContainer href={`${getPostPath(post)}/edit`} className='edit action'>Edit Post</LinkContainer>
                    <LinkContainer href={`${getPostPath(post)}/delete`} className='delete action'>Delete Post</LinkContainer>
                  </div>
                }
              </div>
            )
          })
        }
        <br/>
        <LinkContainer href='/posts/new' className='action'>New Post</LinkContainer>
      </div>
  )
}

export default Posts