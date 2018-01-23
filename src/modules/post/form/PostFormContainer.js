import { connect } from 'react-redux'
import { deepCopy } from '../../../helpers'
import { dispatch } from 'redux'
import { updatePost, createPost } from '../postActions'
import { navigateToPath, flashMessage } from '../../app/appActions'
import { getCurrentUser, getSlug, isAuthorizedToUpdate } from '../../app/appHelpers'

import PostForm from './PostForm'

export const mapStateToProps = (state, ownProps) => {
  let user = getCurrentUser()
  return {
    ...ownProps,
    user_id: user.id,
    author: user.username,
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (e)=>{
      e.preventDefault()
      let post = {}
      Array.from(e.target.elements).forEach(e=>post[e.name] = e.value)
      let user = getCurrentUser()
      post.slug = getSlug(post.title)
      if(post.postAction == 'edit'){
        if(isAuthorizedToUpdate(user, post)){
          dispatch(updatePost(post))
          dispatch(navigateToPath(`/posts/${post.slug}`))
          dispatch(flashMessage('Post Successfully Updated', 'success'))
        } else {
          dispatch(navigateToPath(`/posts/${post.slug}`))
          dispatch(flashMessage('Not authorized to update this post', 'warn'))
        }
      }
      else if(post.postAction == 'new'){
        dispatch(createPost(post))
        dispatch(navigateToPath(`/posts/${post.slug}`))
        dispatch(flashMessage('Post Successfully Created', 'success'))
      }
      return false
    }
  }
}

const PostFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm)

export default PostFormContainer