import { connect } from 'react-redux'
import { deepCopy } from '../../helpers'
import { appRouter } from './appRouter'
import { titleCase } from './appHelpers'
import { getCategories } from '../category/categoryHelpers'

import App from './App'

export const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    content: appRouter(state),
    flash: state.app.flash,
    flash_type: state.app.flash_type,
    currentPath: state.app.path,
    currentController: state.app.controller,
    categories: getCategories(state).sort(),
    currentCategory: state.app.controller === 'categories' ? state.app.slug : null,
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer