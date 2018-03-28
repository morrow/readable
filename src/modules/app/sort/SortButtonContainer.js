import { connect } from 'react-redux'
import SortButtonForm from './SortButtonForm'
import { processForm } from '../appHelpers'
import { sortPosts } from '../../post/postActions'
import { sortPage } from '../appActions'

export const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    sorted_by: state.app.sort.attribute
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (e)=> {
      e.preventDefault()
      let sort = processForm(e.target)
      dispatch(sortPage(sort))
      return false
    }
  }
}

const SortButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SortButtonForm)

export default SortButtonContainer