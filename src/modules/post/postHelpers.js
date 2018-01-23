
export const getNewPost = state => {
  let post = {
    title: '',
    body: '',
    author: '',
    category: '',
    id: state.post.posts.length + 1,
    user_id: state.user.id
  }
  return post
}