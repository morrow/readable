import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './modules/app/AppContainer'
import thunkMiddleware from 'redux-thunk'
import { getRootElement,
        loginCurrentUser } from './helpers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { createUser } from './modules/user/userActions'
import { navigateToPath } from './modules/app/appActions'
import { createHistoryMiddleware,
         createPersistanceMiddleware,
         loadInitialState } from './modules/app/appMiddleware'

import mainReducer from './reducers'

import './index.css'

const APP_NAME = 'READABLE'

const loggerMiddleware = createLogger()
const historyMiddleware = createHistoryMiddleware()
const persistanceMiddleware = createPersistanceMiddleware(APP_NAME, {
  post: true,
  user: true,
  comment: true,
})

const initial_state = loadInitialState(APP_NAME)

let middleware
if(getRootElement().dataset.isVirtual === undefined){
  middleware = applyMiddleware(
    loggerMiddleware,
    thunkMiddleware,
    historyMiddleware,
    persistanceMiddleware,
    )
} else {
  middleware = applyMiddleware(
    thunkMiddleware,
    historyMiddleware,
    persistanceMiddleware,
  )
}

export const store = createStore(mainReducer, initial_state, middleware)

export const render = (root_element=getRootElement())=>{
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>, root_element);
  return root_element
}

render()
store.subscribe(render)

const navigateToCurrentPath = ()=> store.dispatch(navigateToPath(window.location.pathname))
navigateToCurrentPath()
window.onpopstate = navigateToCurrentPath

if(store.getState().user['token'] == undefined){
  store.dispatch(createUser())
}
