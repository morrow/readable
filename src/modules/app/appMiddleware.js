import { initial_state } from '../../reducers'
import { getDiff } from './appHelpers'

export const createLocalStore = ()=>{
  let obj = {}
  obj.getItem = (key)=> obj[key]
  obj.setItem = (key, value)=> obj[key] = value
  obj.removeItem = (key)=> delete obj[key]
  obj.isVirtual = true
  return obj
}

const startSync = (storage_key)=> {
  let diffs = JSON.parse(localStorage.getItem(`${storage_key}/diffs`))
  console.log('sync', diffs)
}

export const createPersistanceMiddleware = (storage_key, shape) => store => next => action => {
  next(action)
  let localStorage = window.localStorage || createLocalStore()
  let _state = store.getState()
  let state = {}
  for(let key in shape){
    if(shape[key]){
      state[key] = _state[key]
    }
  }
  state = {
    ...initial_state,
    ...state
  }
  try{
    let before = {}
    if(localStorage.getItem(storage_key)){
      before = JSON.parse(localStorage.getItem(storage_key))
    }
    let after = state
    let diff = {
      time: (new Date().getTime()),
      diff: getDiff(before, after),
      action: action.type,
    }
    if(JSON.stringify(diff.diff) !== '{}'){
      let diffs = localStorage.getItem(`${storage_key}/diffs`)
      if(diffs){
        try {
          diffs = JSON.parse(diffs)
        } catch(e){
          console.log(e)
          diffs = []
        }
      } else {
        diffs = []
      }
      diffs.push(diff)
      localStorage.setItem(`${storage_key}/diffs`, JSON.stringify(diffs))
      if(!!!localStorage.isVirtual){
        startSync(storage_key)
      }
    }
    localStorage.setItem(storage_key, JSON.stringify(state))
  } catch(e){
    localStorage.removeItem(storage_key)
  }
  return { localStorage }
}

export const createHistoryMiddleware = ()=> store => next => action => {
  next(action)
  let state = store.getState()
  if(state.app.path !== window.location.pathname){
    window.history.pushState({}, state.app.path, state.app.path)
  }
}

export const loadInitialState = (storage_key)=> {
  let localStorage = window.localStorage || createLocalStore()
  let initial_state = {}
  try {
    if(localStorage[storage_key]){
      initial_state = JSON.parse(localStorage[storage_key])
    }
  } catch(e){
    console.log(`Error parsing state from localStorage/${storage_key}`)
    localStorage.removeItem(storage_key)
  }
  return initial_state;
}