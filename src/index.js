import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './modules/app/AppContainer'
import thunkMiddleware from 'redux-thunk'
import { getRootElement,
        loginCurrentUser } from './helpers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { createUser, receiveUserData } from './modules/user/userActions'
import { navigateToPath } from './modules/app/appActions'
import { createHistoryMiddleware,
         createPersistanceMiddleware,
         loadState,
         checkState } from './modules/app/appMiddleware'
import { updatePostState } from './modules/post/postActions'
import { updateCommentState } from './modules/comment/commentActions'
import { initial_post_state } from './modules/post/postReducer'
import { initial_comment_state } from './modules/comment/commentReducer'
import { initial_user_state } from './modules/user/userReducer'

import mainReducer from './reducers'

import './index.css'

export const APP_NAME = 'READABLE'
export const SYNC_URL = 'http://localhost:3001/sync'
export const STATE_URL = 'http://localhost:3001/state'

var current_state_hash = ''

let persistance_keys = {
  post: true,
  user: true,
  comment: true,
}

let persistance_actions = [
  'CREATE_POST',
  'UPDATE_POST',
  'DELETE_POST',
  'UPVOTE_POST',
  'DOWNVOTE_POST',
  'CREATE_COMMENT',
  'UPDATE_COMMENT',
  'DELETE_COMMENT',
  'DELETE_COMMENTS',
  'UPVOTE_COMMENT',
  'DOWNVOTE_COMMENT',
  'INCREASE_COMMENT_TOTAL',
  'DECREASE_COMMENT_TOTAL',
]

const loggerMiddleware = createLogger()
const historyMiddleware = createHistoryMiddleware()
const persistanceMiddleware = createPersistanceMiddleware(APP_NAME, STATE_URL, persistance_keys, persistance_actions)


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

const initial_state = {
  post: initial_post_state,
  comment: initial_comment_state,
  user: initial_user_state,
}

loadState(STATE_URL).then(json => {
  const state = {
    ...initial_state,
    ...json
  }
  const store = createStore(mainReducer, state, middleware)
  const render = (root_element=getRootElement())=>{
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

  try {
    if(window.localStorage['current_user'] !== undefined){
      store.dispatch(receiveUserData(JSON.parse(window.localStorage['current_user'])))
    } else {
      store.dispatch(createUser())
    }
  } catch(e) {
    store.dispatch(createUser())
  }

  setInterval(()=> {
    checkState(SYNC_URL).then(response=>{
      if(current_state_hash != response.hash){
        current_state_hash = response.hash
        loadState(STATE_URL).then(json=>{
          store.dispatch(updatePostState(json))
          store.dispatch(updateCommentState(json))
        })
      }
    })
  }, 1000)

})