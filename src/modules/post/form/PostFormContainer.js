import { connect } from 'react-redux'
import { deepCopy } from '../../../helpers'
import { dispatch } from 'redux'
import { updatePost, createPost, deletePost } from '../postActions'
import { deleteComments } from '../../comment/commentActions'
import { navigateToPath, flashMessage } from '../../app/appActions'
import { getCurrentUser, getSlug, isAuthorizedToUpdate } from '../../app/appHelpers'
import { getPostPath } from '../postHelpers'

import PostForm from './PostForm'

export const mapStateToProps = (state, ownProps) => {
  let user = getCurrentUser()
  return {
    ...ownProps,
    user_id: user.id,
    author: user.username
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (e)=>{
      e.preventDefault()
      let post = {}
      Array.from(e.target.elements).forEach(e=>post[e.name] = e.value)
      post.slug = getSlug(post.title, post.id)
      post.date = (new Date).toISOString()
      if(post.postAction == 'edit'){
        if(isAuthorizedToUpdate(post)){
          dispatch(updatePost(post))
          dispatch(navigateToPath(getPostPath(post)))
          dispatch(flashMessage('Post Successfully Updated', 'success'))
        } else {
          dispatch(navigateToPath(getPostPath(post)))
          dispatch(flashMessage('Not authorized to update this post', 'warn'))
        }
      }
      else if(post.postAction == 'new'){
        dispatch(createPost(post))
        dispatch(navigateToPath(getPostPath(post)))
        dispatch(flashMessage('Post Successfully Created', 'success'))
      }
      else if(post.postAction === 'delete'){
        dispatch(deletePost(post))
        dispatch(deleteComments(post.id))
        dispatch(navigateToPath('/posts'))
        dispatch(flashMessage('Post Successfully Deleted', 'success'))
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