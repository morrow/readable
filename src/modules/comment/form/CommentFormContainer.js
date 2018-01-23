import { connect } from 'react-redux'
import { deepCopy } from '../../../helpers'
import { dispatch } from 'redux'
import { updateComment, createComment } from '../commentActions'
import { navigateToPath, flashMessage } from '../../app/appActions'
import { getCurrentUser, getSlug, isAuthorizedToUpdate, processForm } from '../../app/appHelpers'

import CommentForm from './CommentForm'

export const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    user_id: getCurrentUser().id,
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (e)=>{
      e.preventDefault()
      let comment = processForm(e.target)
      let user = getCurrentUser()
      if(comment.commentAction == 'edit'){
        if(isAuthorizedToUpdate(user, comment)){
          dispatch(updateComment(comment))
          dispatch(navigateToPath(`/posts/${comment.post_slug}`))
          dispatch(flashMessage('Comment Successfully Updated', 'success'))
        } else {
          dispatch(navigateToPath(`/comments/${comment.slug}`))
          dispatch(flashMessage('Not authorized to update this comment', 'warn'))
        }
      }
      else if(comment.commentAction == 'new'){
        dispatch(createComment(comment))
        dispatch(navigateToPath(`/posts/${comment.post_slug}`))
        dispatch(flashMessage('Comment Successfully Created', 'success'))
      }
      return false
    }
  }
}

const CommentFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm)

export default CommentFormContainer