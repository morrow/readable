import { combineReducers } from 'redux'
import appReducer, { initial_app_state } from './modules/app/appReducer'
import postReducer, { initial_post_state } from './modules/post/postReducer'
import commentReducer, { initial_comment_state } from './modules/comment/commentReducer'
import userReducer, { initial_user_state } from './modules/user/userReducer'

const mainReducer = combineReducers({
  app:      appReducer,
  post:     postReducer,
  comment:  commentReducer,
  user:     userReducer,
})

export const initial_state = {
  app:      initial_app_state,
  post:     initial_post_state,
  comment:  initial_comment_state,
  user:     initial_user_state,
}

export default mainReducer