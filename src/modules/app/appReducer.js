import { NAVIGATE_TO_PATH,
         NAVIGATE_TO_RELATIVE_PATH,
         FLASH_MESSAGE,
         SORT_PAGE } from './appActions'
import { parsePath } from './appHelpers'
import { loadState } from './appMiddleware'
import { dispatch } from 'redux'
import { updatePostState } from '../post/postActions'
import { updateCommentState } from '../comment/commentActions'
import { SYNC_URL } from '../../index'

export const initial_app_state = {
  path: '',
  controller: 'error',
  id: undefined,
  action: 'show',
  sort: {
    attribute: 'date',
    method: (a,b)=> a - b,
    reversed: false,
    target: '',
  }
}

const appReducer = (state = initial_app_state, action) => {
  let actions = {
    [NAVIGATE_TO_PATH]: ()=> {
      return {
        ...state,
        ...parsePath(action.path),
        path: action.path,
        flash: null,
      }
    },
    [FLASH_MESSAGE]: ()=> {
      return {
        ...state,
        flash: action.message,
        flash_type: action.flash_type
      }
    },
    [SORT_PAGE]: ()=>{
      let attribute = action.sort.attribute
      var method = (a,b)=> a - b
      var reversed = false
      var target = action.sort.target
      if(attribute === 'date'){
        method = (a, b)=> (new Date(a.date)) - (new Date(b.date))
      } else if(attribute === 'score'){
        method = (a, b)=> parseInt(a.score) - parseInt(b.score)
      } else if(attribute === 'comments'){
        method = (a, b)=> parseInt(a.comment_total) - parseInt(b.comment_total)
      }
      console.log(state.sort.attribute == attribute, state.sort.reversed)
      if(state.sort.attribute == attribute && !state.sort.reversed){
        reversed = true
      }
      return {
        ...state,
        sort: {
          attribute,
          method,
          reversed,
          target
        }
      }
    },
  }
  if(action.type in actions){
    return actions[action.type](state)
  } else {
    return state
  }
}

export default appReducer