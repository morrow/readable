import { connect } from 'react-redux'
import VoteButton from './VoteButton'
import { processForm } from '../appHelpers'

export const mapStateToProps = (state, ownProps) => {
  return {
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (e)=> {
      e.preventDefault()
      let vote = processForm(e.target)
      console.log(vote)
      return false
    }
  }
}

const VoteButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteButton)

export default VoteButtonContainer