import { connect } from 'react-redux'
import { getContainingElement, getAbsolutePath } from '../appHelpers'
import { navigateToPath } from '../appActions'
import Link from './Link'

export const mapStateToProps = (state, ownProps) => {
  if(ownProps){
    return {
      ...state,
      href: getAbsolutePath(ownProps.href)
    }
  }
  return state
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (e) => {
      // prevent browser from navigating
      e.preventDefault()
      // get containing element if exists
      let path = getContainingElement(e.target, 'a').getAttribute('href')
      // add pathname to relative links
      if(path[0] !== '/'){
        path =  getAbsolutePath(path)
      }
      // dispatch navigate action
      dispatch(navigateToPath(path))
      return false
    }
  }
}

const LinkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default LinkContainer