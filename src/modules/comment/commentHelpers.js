
export const getNewComment = state => {
  let comment = {
    name: '',
    score: 0,
    id: state.comment.comments.length + 1,
    user_id: state.user.id,
    post_id: state.app.id,
    post_slug: state.app.slug,
  }
  if((comment.post_id == undefined || comment.post_id == '') && comment.post_slug){
    comment.post_id = state.post.posts.filter(p=>p.slug == comment.post_slug)[0].id
  }
  return comment
}