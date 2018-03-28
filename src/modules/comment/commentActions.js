import { UPDATE_COMMENT,
         CREATE_COMMENT,
         UPVOTE_COMMENT,
         DOWNVOTE_COMMENT,
         DELETE_COMMENT,
         DELETE_COMMENTS,
         UPDATE_COMMENT_STATE,  } from './commentTypes'

export const updateCommentState = (state)=> ({
  type: UPDATE_COMMENT_STATE,
  state
})

export const updateComment = (comment)=> ({
  type: UPDATE_COMMENT,
  comment
})

export const deleteComment = (comment)=> ({
  type: DELETE_COMMENT,
  comment
})

export const createComment = (comment)=> ({
  type: CREATE_COMMENT,
  comment
})

export const upvoteComment = (vote)=> ({
  type: UPVOTE_COMMENT,
  vote
})

export const downvoteComment = (vote)=> ({
  type: DOWNVOTE_COMMENT,
  vote
})

export const deleteComments = (post_id)=> ({
  type: DELETE_COMMENTS,
  post_id
})

// export const sortComments = (criterion)=> ({
//   type: SORT_COMMENTS,
//   criterion
// })
