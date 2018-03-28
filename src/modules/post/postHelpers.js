import { getSlug } from '../app/appHelpers'

export const getNewPost = state => {
  let post = {
    title: '',
    body: '',
    author: '',
    category: '',
    id: state.post.posts.length + 1,
    user_id: state.user.id,
    comment_total: 0,
    score: 0,
  }
  return post
}

export const getPostPath = post => `/posts/${getSlug(post.title, post.id)}`