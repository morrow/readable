import React from 'react'
import Posts from '../post/Posts'
import Comment from '../comment/Comment'

export const userRouter = (state, route)=> {
  let user_id = state.user.id
  if(state.app.id){
    user_id = state.app.id
  }
  let posts = state.post.posts.filter(p=>parseInt(p.user_id) == parseInt(user_id))
  let comments = state.comment.comments.filter(c=>parseInt(c.user_id == parseInt(user_id)))
  return (
    <div id='user'>
      <h1>User #{user_id}</h1>
      <Posts title={`Posts`} posts={posts} sortMethod={state.app.sort.method} sortReversed={state.app.sort.reversed} comments={state.comment.comments} />
      <div id='comments'>
        { comments.sort(comment=>comment.date).reverse().map(comment=>{
          return <Comment data={comment} />
        })}
      </div>
    </div>
  )
}