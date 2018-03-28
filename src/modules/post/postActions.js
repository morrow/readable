import {  UPDATE_POST,
          CREATE_POST,
          UPVOTE_POST,
          DOWNVOTE_POST,
          DELETE_POST,
          SORT_POSTS,
          INCREASE_COMMENT_TOTAL,
          DECREASE_COMMENT_TOTAL,
          UPDATE_POST_STATE, } from './postTypes'

export const updatePostState = state => ({
  type: UPDATE_POST_STATE,
  state
})

export const updatePost = (post)=> ({
  type: UPDATE_POST,
  post
})

export const createPost = (post)=> ({
  type: CREATE_POST,
  post
})

export const deletePost = (post)=> ({
  type: DELETE_POST,
  post
})

export const upvotePost = (vote)=> ({
  type: UPVOTE_POST,
  vote
})

export const downvotePost = (vote)=> ({
  type: DOWNVOTE_POST,
  vote
})

export const sortPosts = (sort)=> ({
  type: SORT_POSTS,
  sort
})

export const increaseCommentTotal = (post_id)=> ({
  type: INCREASE_COMMENT_TOTAL,
  post_id,
})

export const decreaseCommentTotal = (post_id)=> ({
  type: DECREASE_COMMENT_TOTAL,
  post_id,
})