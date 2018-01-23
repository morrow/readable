import { NAVIGATE_TO_PATH,
         NAVIGATE_TO_RELATIVE_PATH,
         FLASH_MESSAGE } from './appActions'
import { parsePath } from './appHelpers'

export const initial_app_state = {
  path: '',
  controller: 'error',
  id: undefined,
  action: 'show',
}

const appReducer = (state = initial_app_state, action) => {
  let actions = {
    [NAVIGATE_TO_PATH]: (state)=> {
      return {
        ...state,
        ...parsePath(action.path),
        path: action.path,
        flash: null,
      }
    },
    [FLASH_MESSAGE]: (state)=> {
      return {
        ...state,
        flash: action.message,
        flash_type: action.flash_type
      }
    }
  }
  if(action.type in actions){
    return actions[action.type](state)
  } else {
    return state
  }
}

export default appReducer