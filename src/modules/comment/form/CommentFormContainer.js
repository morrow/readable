import { connect } from 'react-redux'
import { deepCopy } from '../../../helpers'
import { dispatch } from 'redux'
import { updateComment, createComment, deleteComment } from '../commentActions'
import { increaseCommentTotal, decreaseCommentTotal } from '../../post/postActions'
import { getPostPath } from '../../post/postHelpers'
import { getCommentPath } from '../commentHelpers'
import { navigateToPath, flashMessage } from '../../app/appActions'
import { getCurrentUser, getSlug, isAuthorizedToUpdate, processForm, getContainingElement } from '../../app/appHelpers'

import CommentForm from './CommentForm'

export const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    user_id: getCurrentUser().id,
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cancelAction: (e)=> {
      e.preventDefault()
      let comment = processForm(getContainingElement(e.target, 'form'))
      dispatch(navigateToPath(`/posts/${comment.post_slug}`))
      dispatch(flashMessage('Cancelled', 'success'))
    },
    onSubmit: (e)=>{
      e.preventDefault()
      let comment = processForm(e.target)
      let post_path = `/posts/${comment.post_slug}`
      let user = getCurrentUser()
      if(comment.commentAction === 'edit'){
        if(isAuthorizedToUpdate(comment)){
          dispatch(updateComment(comment))
          dispatch(navigateToPath(post_path))
          dispatch(flashMessage('Comment Successfully Updated', 'success'))
        } else {
          dispatch(navigateToPath(`/comments/${comment.slug}`))
          dispatch(flashMessage('Not authorized to update this comment', 'warn'))
        }
      }
      else if(comment.commentAction == 'new'){
        comment.date = (new Date()).toISOString()
        dispatch(createComment(comment))
        dispatch(increaseCommentTotal(comment.post_id))
        dispatch(navigateToPath(post_path))
        dispatch(flashMessage('Comment Successfully Created', 'success'))
      }
      else if(comment.commentAction === 'delete'){
        dispatch(decreaseCommentTotal(comment.post_id))
        dispatch(deleteComment(comment))
        dispatch(navigateToPath(post_path))
        dispatch(flashMessage('Comment Successfully Deleted', 'success'))
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