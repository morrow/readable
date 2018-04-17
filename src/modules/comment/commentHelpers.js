import { getSlug } from '../app/appHelpers'

export const getNewComment = state => {
  let comment = {
    name: '',
    score: 0,
    id: state.comment.comments.length + 1,
    user_id: state.user.id,
    post_id: state.app.id,
    post_slug: getSlug(state.app.slug, state.app.id),
  }
  return comment
}

export const getCommentPath = (data, action) => {
  if(action){
    return `/comments/${data.id}/${action}`
  }
  return `/comments/${data.id}`
}