import React from 'react'
import { CREATE_USER,
         RECEIVE_USER_DATA } from './userTypes'
import { getSlug } from '../app/appHelpers'

export const initial_user_state = {
  name: undefined,
  id: undefined,
}

const userReducer = (state = initial_user_state, action) => {
  let actions = {
    [CREATE_USER]: ()=> {
      return {
        ...state,
      }
    },
    [RECEIVE_USER_DATA]: ()=> {
      window.localStorage['current_user'] = JSON.stringify(action.data)
      return {
        ...action.data
      }
    }
  }
  if(action.type in actions){
    return actions[action.type]()
  } else {
    return state
  }
}

export default userReducer