import { connect } from 'react-redux'
import VoteButtonForm from './VoteButtonForm'
import { processForm } from '../appHelpers'
import { upvoteComment, downvoteComment } from '../../comment/commentActions'
import { upvotePost, downvotePost } from '../../post/postActions'

export const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const actions = {
  'comment': {
    'up': upvoteComment,
    'down': downvoteComment
  },
  'post':{
    'up': upvotePost,
    'down': downvotePost
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (e)=> {
      e.preventDefault()
      let vote = processForm(e.target)
      if(vote.targetType in actions){
        if(vote.direction in actions[vote.targetType]){
          dispatch(actions[vote.targetType][vote.direction](vote))
        }
      }
      return false
    }
  }
}

const VoteButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteButtonForm)

export default VoteButtonContainer