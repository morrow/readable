import React from 'react'
import UserFormContainer from './form/UserFormContainer'

export const userRouter = (state, route)=> {
  if(state.app.action === 'new' || state.app.path === '/register'){
    if(state.user.username){
      return (<div>User already registered</div>)
    }
    return <UserFormContainer />
  }
  return (<div>User: {JSON.stringify(state.user)}</div>)
}