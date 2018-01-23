import { CREATE_USER,
         RECEIVE_USER_DATA } from './userTypes'
import { navigateToPath } from '../app/appActions'

export const receiveUserData = data => ({
  type: RECEIVE_USER_DATA,
  data
})

export const createUser = ()=> {
  return function(dispatch){
    const url = '/token'
    return fetch(url).then(res => res.json()).then((json) => {
      dispatch(receiveUserData(json))
      // dispatch(navigateToPath('/user'))
    })
  }
}