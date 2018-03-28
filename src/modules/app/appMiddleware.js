import { getCurrentUser } from './appHelpers'
import { updatePostState } from '../post/postActions'
import { updateCommentState } from '../comment/commentActions'

export const createHistoryMiddleware = ()=> store => next => action => {
  next(action)
  let state = store.getState()
  if(state.app.path !== window.location.pathname){
    window.history.pushState({}, state.app.path, state.app.path)
  }
}

const getHeaders = ()=> ({
  'Content-Type': 'application/json;charset=UTF-8',
  'Authorization': getCurrentUser().token,
  'X-Timestamp': (new Date()).getTime(),
})

const syncPost = (url, action) => {
  return fetch(url, {
    headers: getHeaders(),
    method: 'POST',
    body: JSON.stringify(action),
  }).then(response => response.json())
}

const syncGet = (url, )=> {
  return fetch(url, {
    headers: getHeaders(),
    method: 'GET',
  }).then(response => response.json())
}

export const createPersistanceMiddleware = (storage_key, server_url, state_keys, action_types) => store => next => action => {
  next(action)
  if(action_types.indexOf(action.type)>= 0){
    syncPost(server_url, action)
  }
}

export const loadState = (server_url)=> {
  return syncGet(server_url)
}

export const checkState = (url)=> {
  return fetch(url, {
    headers: getHeaders(),
    method: 'GET',
  }).then(response => response.json())
}

// export const createLocalPersistanceMiddleware = (storage_key, server_url, state_keys, action_types) => store => next => action => {
//   next(action)
//   let localStorage = window.localStorage || createLocalStore()
//   let _state = store.getState()
//   let state = {}
//   for(let key in state_keys){
//     if(state_keys[key]){
//       state[key] = _state[key]
//     }
//   }
//   state = {
//     ...initial_state,
//     ...state
//   }
//   let log_entry = {
//       time: (new Date().getTime()),
//       action
//     }
//   if(action_types.indexOf(action.type)>= 0){
//     sync(server_url, log_entry)
//   }
//   try{
//     let before = {}
//     if(localStorage.getItem(storage_key)){
//       before = JSON.parse(localStorage.getItem(storage_key))
//     }
//     let after = state
//     localStorage.setItem(storage_key, JSON.stringify(state))
//   } catch(e){
//     localStorage.removeItem(storage_key)
//   }
//   return { localStorage }
// }

// export const loadInitialStateLocal = (storage_key)=> {
//   let localStorage = window.localStorage || createLocalStore()
//   let initial_state = {}
//   try {
//     if(localStorage[storage_key]){
//       initial_state = JSON.parse(localStorage[storage_key])
//     }
//   } catch(e){
//     console.log(`Error parsing state from localStorage/${storage_key}`)
//     localStorage.removeItem(storage_key)
//   }
//   return initial_state;
// }

// export const createLocalStore = ()=>{
//   let obj = {}
//   obj.getItem = (key)=> obj[key]
//   obj.setItem = (key, value)=> obj[key] = value
//   obj.removeItem = (key)=> delete obj[key]
//   obj.isVirtual = true
//   return obj
// }